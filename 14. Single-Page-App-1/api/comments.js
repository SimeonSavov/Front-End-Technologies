import { url } from "../utils/urls.js"
import { userInfo } from "../utils/userInfo.js"

async function getAll(gameId) {
    return await fetch(url.getBasedUrl() + `/data/comments?where=gameId%3D%22${gameId}%22`)
        .then(res => res.json())
        .then(c => c);
}

function postNew(comment) {
    return fetch(url.getBasedUrl() + `/data/comments`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': userInfo.getToken()
        },
        body: JSON.stringify(comment)
    })
}

export const comments = {
    getAll,
    postNew
}