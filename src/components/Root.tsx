import React from 'react';
import { Provider } from 'react-redux';
import App from '../App';

// TODO: figure out the store type linting issue
const Root = ({ store }) => (
    <Provider store={store}>
        <App />
    </Provider>
);

export default Root;