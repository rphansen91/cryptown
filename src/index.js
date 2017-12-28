import { ApolloProvider } from 'react-apollo';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import client from './gql/client';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import blockStore from './store/reducers/index';
import grey from 'material-ui/colors/grey';
import lightBlue from 'material-ui/colors/lightBlue';
import { BrowserRouter } from 'react-router-dom';
import storage from './utility/storage';

initialStore()
.then(initial => createStore(blockStore, initial))
.then(render);

function initialStore () {
  const initial = window.__INITIAL_STATE__ || {};
  return storage('profile').get()
  .then(profile => {
    initial.profile = profile || {}
    return initial
  })
  .catch(() => initial)
}

function render (store) {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <ApolloProvider client={client(fetch)}>
          <App />
        </ApolloProvider>
      </Provider>
    </BrowserRouter>
  , document.getElementById('root'));
}
