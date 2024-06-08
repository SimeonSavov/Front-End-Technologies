import { url } from '../utils/urls.js'

async function getMostRecentGames() {
    return await fetch(url.getGamesUrl())
    .then(res => res.json())
    .then(items => items);
}

export const games = {
    getMostRecentGames
}