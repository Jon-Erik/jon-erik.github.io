import React from 'react'
import App from './src/App'
import { createRoot } from 'react-dom/client'
import store from './src/state'
import { Provider } from 'react-redux'
import { PrismicProvider } from '@prismicio/react'
import { client } from './src/services/prismic'
import PiwikPro from '@piwikpro/react-piwik-pro'

const { REACT_APP_PIWIK_ID, REACT_APP_PIWIK_URL } = process.env

PiwikPro.initialize(REACT_APP_PIWIK_ID, REACT_APP_PIWIK_URL)

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <PrismicProvider client={client}>
      <App />
    </PrismicProvider>
  </Provider>
)
