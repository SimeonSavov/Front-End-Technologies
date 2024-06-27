const { test, describe, beforeEach, afterEach, beforeAll, afterAll, expect } = require('@playwright/test');
const { chromium } = require('playwright');

const host = 'http://localhost:3001'; // Application host (NOT service host - that can be anything)

let browser;
let context;
let page;

let user = {
    email: "",
    password: "123456",
    confirmPass: "123456",
};

describe("e2e tests", () => {
    beforeAll(async () => {
        browser = await chromium.launch();
    });

    afterAll(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        context = await browser.newContext();
        page = await context.newPage();
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });


    describe("authentication", () => {
        test('register user with valid data', async () => {
            // Arrange
            await page.goto(host);
            await page.click('text=Register');
            await page.waitForSelector('form');

            let random = Math.floor(Math.random() * 10000);
            user.email = `test${random}@test.com`;

            // Act
            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            await page.locator('#repeat-pass').fill(user.confirmPass);

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/register') && response.status() == 200),
                page.click('[type="submit"]')
            ]);
            let userData = await response.json();

            // Assert
            await expect(response.ok()).toBeTruthy();
            expect(userData.email).toBe(user.email);
            expect(userData.password).toBe(user.password);
        });

        test('login with valid data', async () => {
            // Arrange
            await page.goto(host);
            await page.click('text=Login');
            await page.waitForSelector('form');

            // Act
            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/login') && response.status() == 200),
                page.click('[type="submit"]')
            ]);
            let userData = await response.json();

            // Assert
            await expect(response.ok()).toBeTruthy();
            expect(userData.email).toBe(user.email);
            expect(userData.password).toBe(user.password);
        });

        test('logout successfuly', async () => {
            // Arrange
            await page.goto(host);
            await page.click('text=Login');
            await page.waitForSelector('form');
            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            page.click('[type="submit"]');

            // Act
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/logout') && response.status() == 204),
                page.locator('nav >> text=Logout').click()
            ]);

            // Assert
            expect(response.ok()).toBeTruthy();
            await page.waitForSelector('text=Login');
            expect(page.url()).toBe(host + '/');
        });
    });

    describe("navbar", () => {
        test('navbar for logged in user', async () => {
            // Act
            await page.goto(host);
            await page.click('text=Login');
            await page.waitForSelector('form');
            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            page.click('[type="submit"]');

            // Assert
            await expect(page.locator('nav >> text=Dashboard')).toBeVisible();
            await expect(page.locator('nav >> text=My Books')).toBeVisible();
            await expect(page.locator('nav >> text=Add Book')).toBeVisible();
            await expect(page.locator('nav >> text=Logout')).toBeVisible();

            await expect(page.locator('nav >> text=Login')).toBeHidden();
            await expect(page.locator('nav >> text=Register')).toBeHidden();
        });

        test('navbar for guest user', async () => {
            // Act
            await page.goto(host);

            // Assert
            await expect(page.locator('nav >> text=Login')).toBeVisible();
            await expect(page.locator('nav >> text=Register')).toBeVisible();
            await expect(page.locator('nav >> text=Dashboard')).toBeVisible();

            await expect(page.locator('nav >> text=My Books')).toBeHidden();
            await expect(page.locator('nav >> text=Add Book')).toBeHidden();
            await expect(page.locator('nav >> text=Logout')).
                toBeHidden();
        });
    });

    describe("CRUD", () => {
        beforeEach(async () => {
            await page.goto(host);
            await page.click('text=Login');
            await page.waitForSelector('form');
            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            page.click('[type="submit"]');
        });

        test('create a book', async () => {
            // Arrange
            await page.click('text=Add book');
            await page.waitForSelector('form');

            // Act
            await page.fill('[name="title"]', 'Random Title');
            await page.fill('[name="description"]', 'Random Description');
            await page.fill('[name="imageUrl"]', '/images/book.png');
            await page.locator('#type').selectOption('Other');

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/data/books') && response.status() == 200),
                page.click('[type="submit"]')
            ]);
            let bookData = await response.json();

            // Assert
            expect(response.ok()).toBeTruthy();
            expect(bookData.title).toEqual('Random Title');
            expect(bookData.description).toEqual('Random Description');
            expect(bookData.imageUrl).toEqual('/images/book.png');
            expect(bookData.type).toEqual('Other');
        });

        test('edit a book', async () => {
            // Arrange
            await page.click('text=My Books');
            await page.locator('text=Details').first().click();
            await page.click('text=Edit');
            await page.waitForSelector('form');

            // Act
            await page.fill('[name="title"]', 'Random Edited Title');
            await page.locator('#type').selectOption('Other');
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/data/books') && response.status() == 200),
                page.click('[type="submit"]')
            ]);
            let bookData = await response.json();

            // Assert
            expect(response.ok()).toBeTruthy();
            expect(bookData.title).toEqual('Random Edited Title');
            expect(bookData.description).toEqual('Random Description');
            expect(bookData.imageUrl).toEqual('/images/book.png');
            expect(bookData.type).toEqual('Other');
        });

        test('delete a book', async () => {
            // Act
            await page.click('text=My Books');
            await page.locator('text=Details').first().click();
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/data/books') && response.status() == 200),
                page.click('text=Delete')
            ]);

            // Assert
            expect(response.ok()).toBeTruthy();
        });
    });
})