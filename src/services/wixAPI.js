import req from "./fetch"
const { 
    REACT_APP_WIX_API_URL, 
    REACT_APP_WIX_API_TOKEN_PATH, 
    REACT_APP_WIX_API_CLIENT_ID, 
    REACT_APP_WIX_API_QUERY_PATH 
} = process.env

const ACCESS_TOKEN = "ACCESS_TOKEN"
const TOKEN_EXPIRY = "TOKEN_EXPIRY"
const FIFTY_MIN = 1000 * 60 * 50
const defaultQuery = {
    "filter": {},
    "paging": {
        "offset": 0,
        "limit": 50
    }
}

let tokenPromise = null

async function requestAndSetToken() {
    const { access_token, expires_in } = await req({
        url: REACT_APP_WIX_API_URL + REACT_APP_WIX_API_TOKEN_PATH,
        method: "POST",
        body: {
            "clientId": REACT_APP_WIX_API_CLIENT_ID,
            "grantType": "anonymous"
        }
    })

    const newExpiry = Date.now() + (expires_in * 1000) - FIFTY_MIN

    // Token is valid for four hours. Get the unix timestamp 3h50min from now so there 
    // are no gaps from the time it took to load the token
    localStorage.setItem(ACCESS_TOKEN, access_token)
    localStorage.setItem(TOKEN_EXPIRY, newExpiry)

    return access_token
}

async function getToken() {
    let token = localStorage.getItem(ACCESS_TOKEN)
    let expiry = localStorage.getItem(TOKEN_EXPIRY)

    if (token && expiry && parseInt(expiry) < Date.now()) {
        return token
    } else {
        if (!tokenPromise) {
            tokenPromise = requestAndSetToken()
        }

        await tokenPromise
        token = localStorage.getItem(ACCESS_TOKEN)
        tokenPromise = null

        return token
    }
}

async function loadData(collectionId, query) {
    const token = await getToken()
    const data = await req({
        url: REACT_APP_WIX_API_URL + REACT_APP_WIX_API_QUERY_PATH,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: {
            "dataCollectionId": collectionId,
            "query": query || defaultQuery
        }
    })
    
    return data
}

 export {
    getToken,
    loadData
}