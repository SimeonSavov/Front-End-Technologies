const baseUrl = 'http://localhost:3030/';

let user = {
    email: '',
    password: '123456'
};

let book = {
    title: '',
    description: '',
    imageUrl: '/images/book.png',
    type: 'Action'
};

let token = '';
let userId = '';
let lastCreatedBookId = '';

QUnit.config.reorder = false;

QUnit.module('user functionalities', () => {

    QUnit.test('register user with valid data', async (assert) => {
        // Arrange
        let path = 'users/register';
        let random = Math.floor(Math.random() * 10000);
        let email = `test${random}@test.bg`;
        user.email = email;

        // Act
        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        let userData = await response.json();

        // Assert
        assert.ok(response.ok, 'success response');

        assert.ok(userData.hasOwnProperty('email'), 'email exists');
        assert.equal(userData.email, user.email, 'email as expected');
        assert.strictEqual(typeof userData.email, 'string', 'email has correct type');

        assert.ok(userData.hasOwnProperty('password'), 'password exists');
        assert.equal(userData.password, user.password, 'password as expected');
        assert.strictEqual(typeof userData.password, 'string', 'password has correct type');

        assert.ok(userData.hasOwnProperty('_createdOn'), '_createdOn exists');
        assert.strictEqual(typeof userData._createdOn, 'number', '_createdOn has correct type');

        assert.ok(userData.hasOwnProperty('_id'), '_id exists');
        assert.strictEqual(typeof userData._id, 'string', '_id has correct type');

        assert.ok(userData.hasOwnProperty('accessToken'), 'accessToken exists');
        assert.strictEqual(typeof userData.accessToken, 'string', 'accessToken has correct type');

        token = userData.accessToken;
        userId = userData._id;
        sessionStorage.setItem('book-user', JSON.stringify(user));
    });

    QUnit.test('login with valid data', async (assert) => {
        // Arrange
        let path = 'users/login';

        // Act
        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        let userData = await response.json();

        // Assert
        assert.ok(response.ok, 'success response');

        assert.ok(userData.hasOwnProperty('email'), 'email exists');
        assert.equal(userData.email, user.email, 'email as expected');
        assert.strictEqual(typeof userData.email, 'string', 'email has correct type');

        assert.ok(userData.hasOwnProperty('password'), 'password exists');
        assert.equal(userData.password, user.password, 'password as expected');
        assert.strictEqual(typeof userData.password, 'string', 'password has correct type');

        assert.ok(userData.hasOwnProperty('_createdOn'), '_createdOn exists');
        assert.strictEqual(typeof userData._createdOn, 'number', '_createdOn has correct type');

        assert.ok(userData.hasOwnProperty('_id'), '_id exists');
        assert.strictEqual(typeof userData._id, 'string', '_id has correct type');

        assert.ok(userData.hasOwnProperty('accessToken'), 'accessToken exists');
        assert.strictEqual(typeof userData.accessToken, 'string', 'accessToken has correct type');

        token = userData.accessToken;
        userId = userData._id;
        sessionStorage.setItem('book-user', JSON.stringify(user));
    });
});

QUnit.module('books functionalities', () => {

    QUnit.test('get all books', async (assert) => {
        // Arrange
        let path = 'data/books';
        let queryParams = '?sortBy=_createdOn%20desc';

        // Act
        let response = await fetch(baseUrl + path + queryParams);
        let bookData = await response.json();

        // Assert
        assert.ok(response.ok, 'success response');
        assert.ok(Array.isArray(bookData), 'response is array');

        bookData.forEach(book => {

            assert.ok(book.hasOwnProperty('description'), 'description exists');
            assert.strictEqual(typeof book.description, 'string', 'description has correct type');

            assert.ok(book.hasOwnProperty('imageUrl'), 'imageUrl exists');
            assert.strictEqual(typeof book.imageUrl, 'string', 'imageUrl has correct type');

            assert.ok(book.hasOwnProperty('title'), 'title exists');
            assert.strictEqual(typeof book.title, 'string', 'title has correct type');

            assert.ok(book.hasOwnProperty('type'), 'type exists');
            assert.strictEqual(typeof book.type, 'string', 'type has correct type');

            assert.ok(book.hasOwnProperty('_createdOn'), '_createdOn exists');
            assert.strictEqual(typeof book._createdOn, 'number', '_createdOn has correct type');

            assert.ok(book.hasOwnProperty('_id'), '_id exists');
            assert.strictEqual(typeof book._id, 'string', '_id has correct type');

            assert.ok(book.hasOwnProperty('_ownerId'), '_ownerId exists');
            assert.strictEqual(typeof book._ownerId, 'string', '_ownerId has correct type');
        });
    });

    QUnit.test('create a book', async (assert) => {
        // Arrange
        let path = 'data/books';
        let random = Math.floor(Math.random() * 10000);
        book.title = `Title ${random}`;
        book.description = `Description ${random}`;

        // Act
        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(book)
        });
        let bookData = await response.json();

        // Assert
        assert.ok(response.ok, 'success response');

        assert.ok(bookData.hasOwnProperty('description'), 'description exists');
        assert.strictEqual(bookData.description, book.description, 'description is expected');
        assert.strictEqual(typeof bookData.description, 'string', 'description has correct type');

        assert.ok(bookData.hasOwnProperty('imageUrl'), 'imageUrl exists');
        assert.strictEqual(bookData.imageUrl, book.imageUrl, 'imageUrl is expected');
        assert.strictEqual(typeof bookData.imageUrl, 'string', 'imageUrl has correct type');

        assert.ok(bookData.hasOwnProperty('title'), 'title exists');
        assert.strictEqual(bookData.title, book.title, 'title is expected');
        assert.strictEqual(typeof bookData.title, 'string', 'title has correct type');

        assert.ok(bookData.hasOwnProperty('type'), 'type exists');
        assert.strictEqual(bookData.type, book.type, 'type is expected');
        assert.strictEqual(typeof bookData.type, 'string', 'type has correct type');

        assert.ok(bookData.hasOwnProperty('_createdOn'), '_createdOn exists');
        assert.strictEqual(typeof bookData._createdOn, 'number', '_createdOn has correct type');

        assert.ok(bookData.hasOwnProperty('_id'), '_id exists');
        assert.strictEqual(typeof bookData._id, 'string', '_id has correct type');

        assert.ok(bookData.hasOwnProperty('_ownerId'), '_ownerId exists');
        assert.strictEqual(bookData._ownerId, userId, '_ownerId is expected');
        assert.strictEqual(typeof bookData._ownerId, 'string', '_ownerId has correct type');

        lastCreatedBookId = bookData._id;
    });

    QUnit.test('edit a book', async (assert) => {
        // Arrange
        let path = 'data/books';
        let random = Math.floor(Math.random() * 10000);
        book.title = `Edited title ${random}`;

        // Act
        let response = await fetch(baseUrl + path + `/${lastCreatedBookId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(book)
        });
        let bookData = await response.json();

        // Assert
        assert.ok(response.ok, 'success response');

        assert.ok(bookData.hasOwnProperty('description'), 'description exists');
        assert.strictEqual(bookData.description, book.description, 'description is expected');
        assert.strictEqual(typeof bookData.description, 'string', 'description has correct type');

        assert.ok(bookData.hasOwnProperty('imageUrl'), 'imageUrl exists');
        assert.strictEqual(bookData.imageUrl, book.imageUrl, 'imageUrl is expected');
        assert.strictEqual(typeof bookData.imageUrl, 'string', 'imageUrl has correct type');

        assert.ok(bookData.hasOwnProperty('title'), 'title exists');
        assert.strictEqual(bookData.title, book.title, 'title is expected');
        assert.strictEqual(typeof bookData.title, 'string', 'title has correct type');

        assert.ok(bookData.hasOwnProperty('type'), 'type exists');
        assert.strictEqual(bookData.type, book.type, 'type is expected');
        assert.strictEqual(typeof bookData.type, 'string', 'type has correct type');

        assert.ok(bookData.hasOwnProperty('_createdOn'), '_createdOn exists');
        assert.strictEqual(typeof bookData._createdOn, 'number', '_createdOn has correct type');

        assert.ok(bookData.hasOwnProperty('_id'), '_id exists');
        assert.strictEqual(typeof bookData._id, 'string', '_id has correct type');

        assert.ok(bookData.hasOwnProperty('_ownerId'), '_ownerId exists');
        assert.strictEqual(bookData._ownerId, userId, '_ownerId is expected');
        assert.strictEqual(typeof bookData._ownerId, 'string', '_ownerId has correct type');
    });

    QUnit.test('delete a book', async (assert) => {
        // Arrange
        let path = 'data/books';

        // Act
        let response = await fetch(baseUrl + path + `/${lastCreatedBookId}`, {
            method: 'DELETE',
            headers: {
                'X-Authorization': token
            }
        });

        // Assert
        assert.ok(response.ok, 'success response');
    });
});