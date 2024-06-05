const { nthPrime } = require("./test_functions.js")

QUnit.module("nthPrime functions tests", () => {

    QUnit.test("1th prime number", function(assert) {
        assert.equal(nthPrime(1), 2, "1th prime number passed")
    });

    QUnit.test("5th prime number", function(assert) {
        assert.equal(nthPrime(5), 11, "5th prime number passed")
    });

    QUnit.test("11th prime number", function(assert) {
        assert.equal(nthPrime(11), 31, "11th prime number passed")
    });
})