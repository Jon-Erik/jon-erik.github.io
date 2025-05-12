import React from 'react'
import App from './src/App'
import { createRoot } from 'react-dom/client'
import store from './src/state'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PiwikPro from '@piwikpro/react-piwik-pro'

const { REACT_APP_PIWIK_ID, REACT_APP_PIWIK_URL } = process.env

const queryClient = new QueryClient()

PiwikPro.initialize(REACT_APP_PIWIK_ID, REACT_APP_PIWIK_URL)

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>
)
