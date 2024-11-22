import * as prismic from '@prismicio/client'
const { 
  REACT_APP_PRISMIC_ACCESS_TOKEN
} = process.env

const repositoryName = 'headless-cms-jonerik'
const routes = [
  // Update to match your website's URL structure
  //{ type: 'page', path: '/:uid' },
  { type: 'homepage', path: '/' },
]

const client = prismic.createClient(repositoryName, { routes, REACT_APP_PRISMIC_ACCESS_TOKEN })

module.exports = { 
  client,
  asHTML: prismic.asHTML 
}