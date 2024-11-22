import * as prismic from '@prismicio/client'

const repositoryName = 'headless-cms-jonerik'
const accessToken = 'MC5aei1Qc0JFQUFDb0FEbUdU.ZO-_vXXvv71677-977-977-9OmYaE--_ve-_vXLvv70f77-977-9R--_vVHvv70_Re-_vVtqX--_ve-_vRk' // Set an access token
const routes = [
  // Update to match your website's URL structure
  //{ type: 'page', path: '/:uid' },
  { type: 'homepage', path: '/' },
]

const client = prismic.createClient(repositoryName, { routes, accessToken })

module.exports = { client }