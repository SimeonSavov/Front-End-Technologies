const baseUrl = 'http://localhost:3030/';

let user = {
    email: '',
    password: '123456'
};

let album = {
    name: "",
    artist: "Unknown",
    description: "",
    genre: "Random genre",
    imgUrl: "/images/pinkFloyd.jpg",
    price: "15.25",
    releaseDate: "29 June 2024", 
}

let token = '';
let userId = '';
let lastCreatedAlbumId = '';


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
    })
});

QUnit.module('album functionalities', () => {

    QUnit.test('get all albums', async (assert) => {
        // Arrange
        let path = 'data/albums';
        let queryParams = '?sortBy=_createdOn%20desc&distinct=name';

        // Act
        let response = await fetch(baseUrl + path + queryParams);
        let albumData = await response.json();

        // Assert
        assert.ok(response.ok, 'success response');
        assert.ok(Array.isArray(albumData), 'response is array');

        albumData.forEach(album => {
            
            assert.ok(album.hasOwnProperty('name'), 'name exists');
            assert.strictEqual(typeof album.name, 'string', 'name has correct type');

            assert.ok(album.hasOwnProperty('artist'), 'artist exists');
            assert.strictEqual(typeof album.artist, 'string', 'artist has correct type');

            assert.ok(album.hasOwnProperty('genre'), 'genre exists');
            assert.strictEqual(typeof album.genre, 'string', 'genre has correct type');

            assert.ok(album.hasOwnProperty('imgUrl'), 'imgUrl exists');
            assert.strictEqual(typeof album.imgUrl, 'string', 'imgUrl has correct type');

            assert.ok(album.hasOwnProperty('price'), 'price exists');
            assert.strictEqual(typeof album.price, 'string', 'price has correct type');

            assert.ok(album.hasOwnProperty('releaseDate'), 'releaseDate exists');
            assert.strictEqual(typeof album.releaseDate, 'string', 'releaseDate has correct type');

            assert.ok(album.hasOwnProperty('description'), 'description exists');
            assert.strictEqual(typeof album.description, 'string', 'description has correct type');

            assert.ok(album.hasOwnProperty('_createdOn'), '_createdOn exists');
            assert.strictEqual(typeof album._createdOn, 'number', '_createdOn has correct type');

            assert.ok(album.hasOwnProperty('_id'), '_id exists');
            assert.strictEqual(typeof album._id, 'string', '_id has correct type');
        });
    });

    QUnit.test('create an album', async (assert) => {
        // Arrange
        let path = 'data/albums';
        let random = Math.floor(Math.random() * 10000);
        album.name = `Random name ${random}`;
        album.description = `Random description ${random}`;

        // Act
        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(album)
        });
        let albumData = await response.json();

        // Assert
        assert.ok(response.ok, 'success response');

        assert.ok(albumData.hasOwnProperty('name'), 'name exists');
            assert.strictEqual(typeof albumData.name, 'string', 'name has correct type');

            assert.ok(albumData.hasOwnProperty('artist'), 'artist exists');
            assert.strictEqual(albumData.artist, album.artist, 'artist is expected');
            assert.strictEqual(typeof albumData.artist, 'string', 'artist has correct type');

            assert.ok(albumData.hasOwnProperty('genre'), 'genre exists');
            assert.strictEqual(albumData.genre, album.genre, 'genre is expected');
            assert.strictEqual(typeof albumData.genre, 'string', 'genre has correct type');

            assert.ok(albumData.hasOwnProperty('imgUrl'), 'imgUrl exists');
            assert.strictEqual(albumData.imgUrl, album.imgUrl, 'imgUrl is expected');
            assert.strictEqual(typeof albumData.imgUrl, 'string', 'imgUrl has correct type');

            assert.ok(albumData.hasOwnProperty('price'), 'price exists');
            assert.strictEqual(albumData.price, album.price, 'price is expected');
            assert.strictEqual(typeof albumData.price, 'string', 'price has correct type');

            assert.ok(albumData.hasOwnProperty('releaseDate'), 'releaseDate exists');
            assert.strictEqual(albumData.releaseDate, album.releaseDate, 'releaseDate is expected');
            assert.strictEqual(typeof albumData.releaseDate, 'string', 'releaseDate has correct type');

            assert.ok(albumData.hasOwnProperty('description'), 'description exists');
            assert.strictEqual(albumData.description, album.description, 'description is expected');
            assert.strictEqual(typeof albumData.description, 'string', 'description has correct type');

            assert.ok(albumData.hasOwnProperty('_createdOn'), '_createdOn exists');
            assert.strictEqual(typeof albumData._createdOn, 'number', '_createdOn has correct type');

            assert.ok(albumData.hasOwnProperty('_id'), '_id exists');
            assert.strictEqual(typeof albumData._id, 'string', '_id has correct type');

            lastCreatedAlbumId = albumData._id;
    });

    QUnit.test('edit an album', async (assert) => {
        // Arrange
        let path = 'data/albums';
        let random = Math.floor(Math.random() * 10000);
        album.name = `Random edited name ${random}`;
    
        // Act
        let response = await fetch(baseUrl + path + `/${lastCreatedAlbumId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(album)
        });
        
        // Log response status and data for debugging
        console.log('Response status:', response.status);
        let albumData = await response.json();
        console.log('Response data:', albumData);
    
        // Assert
        assert.ok(response.ok, 'success response');
    
        assert.ok(albumData.hasOwnProperty('name'), 'name exists');
        assert.strictEqual(typeof albumData.name, 'string', 'name has correct type');
    
        assert.ok(albumData.hasOwnProperty('artist'), 'artist exists');
        assert.strictEqual(albumData.artist, album.artist, 'artist is expected');
        assert.strictEqual(typeof albumData.artist, 'string', 'artist has correct type');
    
        assert.ok(albumData.hasOwnProperty('genre'), 'genre exists');
        assert.strictEqual(albumData.genre, album.genre, 'genre is expected');
        assert.strictEqual(typeof albumData.genre, 'string', 'genre has correct type');
    
        assert.ok(albumData.hasOwnProperty('imgUrl'), 'imgUrl exists');
        assert.strictEqual(albumData.imgUrl, album.imgUrl, 'imgUrl is expected');
        assert.strictEqual(typeof albumData.imgUrl, 'string', 'imgUrl has correct type');
    
        assert.ok(albumData.hasOwnProperty('price'), 'price exists');
        assert.strictEqual(albumData.price, album.price, 'price is expected');
        assert.strictEqual(typeof albumData.price, 'string', 'price has correct type');
    
        assert.ok(albumData.hasOwnProperty('releaseDate'), 'releaseDate exists');
        assert.strictEqual(albumData.releaseDate, album.releaseDate, 'releaseDate is expected');
        assert.strictEqual(typeof albumData.releaseDate, 'string', 'releaseDate has correct type');
    
        assert.ok(albumData.hasOwnProperty('description'), 'description exists');
        assert.strictEqual(albumData.description, album.description, 'description is expected');
        assert.strictEqual(typeof albumData.description, 'string', 'description has correct type');
    
        assert.ok(albumData.hasOwnProperty('_createdOn'), '_createdOn exists');
        assert.strictEqual(typeof albumData._createdOn, 'number', '_createdOn has correct type');
    
        assert.ok(albumData.hasOwnProperty('_id'), '_id exists');
        assert.strictEqual(typeof albumData._id, 'string', '_id has correct type');
    
        lastCreatedAlbumId = albumData._id;
    });
    
    QUnit.test('delete an album', async (assert) => {
        // Arrange
        let path = 'data/albums';

        // Act
        let response = await fetch(baseUrl + path + `/${lastCreatedAlbumId}`, {
            method: 'DELETE',
            headers: {
                'X-Authorization': token
            }
        });

        // Assert
        assert.ok(response.ok, 'success response');
    });
})