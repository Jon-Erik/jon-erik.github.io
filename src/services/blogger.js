import { req } from './fetch'

const MAX_RESULTS = 5
const { REACT_APP_BLOGGER_API_KEY, REACT_APP_BLOGGER_API_URL } = process.env

export async function getBlogPosts(nextPageToken) {
  params = {
    key: REACT_APP_BLOGGER_API_KEY,
    maxResults: MAX_RESULTS
  }

  if (nextPageToken) {
    params.pageToken = nextPageToken
  }

  return await req({
    url: REACT_APP_BLOGGER_API_URL,
    method: 'GET',
    params
  })
}
