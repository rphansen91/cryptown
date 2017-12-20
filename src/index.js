import { ApolloProvider } from 'react-apollo';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import client from './gql/client';
import registerServiceWorker from './registerServiceWorker';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import blockStore from './store/reducers/index';
import grey from 'material-ui/colors/grey';
import lightBlue from 'material-ui/colors/lightBlue';
import { BrowserRouter } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: grey,
    secondary: lightBlue,
  }
});

const store = createStore(blockStore);

render();
registerServiceWorker();

function render () {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <MuiThemeProvider theme={theme}>
            <App />
          </MuiThemeProvider>
        </ApolloProvider>
      </Provider>
    </BrowserRouter>
  , document.getElementById('root'));
}
