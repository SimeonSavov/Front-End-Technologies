function sum(a, b) {
    return a + b;
}

function isEven(num) {
    return num % 2 == 0;
}

function factorial(n) {
    if (n === 0 || n === 1 || n < 0) {
        return 1;
    }
    return n * factorial(n - 1);
}

function isPalindrome(str) {
    if (str === "") {
        return false;
    }
    const cleanStr = str.toLowerCase()
        .replace(/[\W_]/g, "");
    const reversedStr = cleanStr.split("")
        .reverse().join("");

    return cleanStr === reversedStr;
}

function fibonacci(n) {
    if (n === 0) {
        return [];
    }

    if (n === 1) {
        return [0];
    }

    let sequence = [0, 1];

    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }

    return sequence;
}

function nthPrime(n) {
    let count = 0;
    let num = 2;
    while (count < n) {
        if (isPrime(n)) {
            count++;
        }

        num++;
    }

    return num - 1;
}

function isPrime(n) {
    if (n <= 1) {
        return false;
    }
    if (n <= 3) {
        return true;
    }
    if (n % 2 === 0 || n % 3 === 0) {
        return false;
    }

    for (let i = 5; i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) {
            return false;
        }
    }

    return true;
}

function pascalsTriangle(rows) {
    let triangle = [];
    for (let i = 0; i < rows; i++) {
        triangle[i] = [];
        triangle[i][0] = 1;

        for (let j = 1; j < i; j++) {
            triangle[i][j] = triangle[i - 1][j - 1] + triangle[i-1][j];
        }
        triangle[i][i] = 1
    }

    return triangle;
}

function isPerfectSquare(num) {
    return Math.sqrt(num) % 1 === 0;
}

module.exports = {
    sum,
    isEven,
    factorial,
    isPalindrome,
    fibonacci,
    nthPrime,
    isPrime,
    pascalsTriangle,
    isPerfectSquare
}