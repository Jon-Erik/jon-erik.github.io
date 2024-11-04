import React from 'react';
import App from './src/App';
import { createRoot } from 'react-dom/client';
import store from './src/state';
import { Provider } from 'react-redux'

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);