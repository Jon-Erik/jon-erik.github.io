import React from 'react';
import App from './src/App';
import { createRoot } from 'react-dom/client';
import store from './src/state';
import { Provider } from 'react-redux'
import { PrismicProvider } from '@prismicio/react'
//import { client } from './src/services/prismic'

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <Provider store={store}>
        {/* <PrismicProvider client={client}> */}
            <App />
        {/* </PrismicProvider> */}
    </Provider>
);