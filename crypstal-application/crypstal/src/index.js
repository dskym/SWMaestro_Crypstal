import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { createStore } from 'redux';
import botApp from './reducer/reducers'

import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';

const store = createStore(botApp);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();