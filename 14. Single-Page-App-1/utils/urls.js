function getLoginUrl() {
    return "http://localhost:3030/users/login";
}

function getRegisterUrl() {
    return "http://localhost:3030/users/register";
}

function getLogoutUrl() {
    return "http://localhost:3030/users/logout";
}

function getBasedUrl() {
    return "http://localhost:3030";
}

function getGamesUrl() {
    return `${getBasedUrl()}/data/games`; // ?sortby=_createdOn%20desc&distinct=category
}

function endCodeUrl(url) {
    return encodeURIComponent(url);
}

export const url = {
    getLoginUrl,
    getRegisterUrl,
    getLogoutUrl,
    getBasedUrl,
    getGamesUrl,
    endCodeUrl
}