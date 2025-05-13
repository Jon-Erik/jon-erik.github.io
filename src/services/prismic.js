import * as prismic from '@prismicio/client'
const { REACT_APP_PRISMIC_ACCESS_TOKEN, REACT_APP_PRISMIC_REPO_NAME } =
  process.env
const routes = []

const client = prismic.createClient(REACT_APP_PRISMIC_REPO_NAME, {
  routes,
  REACT_APP_PRISMIC_ACCESS_TOKEN
})

module.exports = {
  client,
  asHTML: prismic.asHTML
}
