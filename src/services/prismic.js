import * as prismic from '@prismicio/client'
const { 
  REACT_APP_PRISMIC_ACCESS_TOKEN
} = process.env

const repositoryName = 'headless-cms-jonerik'
const routes = []

const client = prismic.createClient(repositoryName, { routes, REACT_APP_PRISMIC_ACCESS_TOKEN })

module.exports = { 
  client,
  asHTML: prismic.asHTML 
}