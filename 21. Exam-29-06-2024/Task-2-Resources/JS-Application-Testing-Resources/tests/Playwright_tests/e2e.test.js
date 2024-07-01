const { test, describe, beforeEach, afterEach, beforeAll, afterAll, expect } = require('@playwright/test');
const { chromium } = require('playwright');

const host = 'http://localhost:3000'; // Application host (NOT service host - that can be anything)

let browser;
let context;
let page;

let user = {
    email : "",
    password : "123456",
    confirmPass : "123456",
};

let albumName = "";

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
        test('register user', async () => {
            // Arrange
            await page.goto(host);
            await page.click('text=Register');
            await page.waitForSelector('form');

            let random = Math.floor(Math.random() * 10000);
            user.email = `test${random}@test.com`;

            // Act
            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            await page.locator('#conf-pass').fill(user.confirmPass);

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

        test('login user', async () => {
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

        test('logout user', async () => {
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
            await expect(page.locator('nav >> text=Home')).toBeVisible();
            await expect(page.locator('nav >> text=Catalog')).toBeVisible();
            await expect(page.locator('nav >> text=Search')).toBeVisible();
            await expect(page.locator('nav >> text=Create Album')).toBeVisible();
            await expect(page.locator('nav >> text=Logout')).toBeVisible();

            await expect(page.locator('nav >> text=Login')).toBeHidden();
            await expect(page.locator('nav >> text=Register')).toBeHidden();
        });

        test('navbar for guest user', async () => {
            // Act
            await page.goto(host);

            // Assert
            await expect(page.locator('nav >> text=Home')).toBeVisible();
            await expect(page.locator('nav >> text=Catalog')).toBeVisible();
            await expect(page.locator('nav >> text=Search')).toBeVisible();
            await expect(page.locator('nav >> text=Login')).toBeVisible();
            await expect(page.locator('nav >> text=Register')).toBeVisible();

            await expect(page.locator('nav >> text=Create Album')).toBeHidden();
            await expect(page.locator('nav >> text=Logout')).toBeHidden();

            
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

        test('create an album', async () => {
            // Arrange
            await page.click('text=Create Album');
            await page.waitForSelector('form');
            let random = Math.floor(Math.random() * 10000);
            albumName = `Random name ${random}`


            // Act
            await page.fill('[name="name"]', albumName);
            await page.fill('[name="imgUrl"]', 'Random image');
            await page.fill('[name="price"]', '11');
            await page.fill('[name="releaseDate"]', 'Random date');
            await page.fill('[name="artist"]', 'Random artist');
            await page.fill('[name="genre"]', 'Random genre');
            await page.fill('[name="description"]', 'Random description');

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/data/albums') && response.status() == 200),
                page.click('[type="submit"]')
            ]);
            let albumData = await response.json();

            // Assert
            expect(response.ok()).toBeTruthy();
            expect(albumData.name).toEqual(albumName);
            expect(albumData.imgUrl).toEqual('Random image');
            expect(albumData.price).toEqual('11');
            expect(albumData.releaseDate).toEqual('Random date');
            expect(albumData.artist).toEqual('Random artist');
            expect(albumData.genre).toEqual('Random genre');
            expect(albumData.description).toEqual('Random description');
        });

        test('edit an album', async () => {
            // Arrange
            await page.click('nav >> text=Search');
            await page.waitForSelector('input[name="search"]');
            await page.fill('input[name="search"]', albumName);
            await page.click('.button-list >> text=Search');
            await page.click('text=Details')
            await page.click('text=Edit');
            await page.waitForSelector('form');

            // Act
            await page.fill('#price', '55')
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/data/albums') && response.status() === 200),
                page.click('[type="submit"]')
            ]);
            let albumData = await response.json();

            // Arrange
            expect(response.ok()).toBeTruthy();
            expect(albumData.title).toEqual(albumName);
            expect(albumData.imgUrl).toEqual('Random image');
            expect(albumData.price).toEqual('55');
            expect(albumData.releaseDate).toEqual('Random date');
            expect(albumData.artist).toEqual('Random artist');
            expect(albumData.genre).toEqual('Random genre');
            expect(albumData.description).toEqual('Random description');
        });

        test('delete an album', async () => {
            // Arrange
            await page.click('nav >> text=Search');
            await page.waitForSelector('input[name="search"]');

            await page.fill('input=[name="search"]', albumName);

            await page.click('.button-list >> text=Search');

            // Act
            await page.click(`text=${albumName}`);

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/data/albums') && response.status() == 200),
                page.click('.remove'), page.on('dialog', dialog => dialog.accept())
            ]);

            // Assert
            expect(response.ok()).toBeTruthy();
        });
    });
});