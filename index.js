import React from 'react'
import App from './src/App'
import { createRoot } from 'react-dom/client'
import store from './src/state'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>
)
