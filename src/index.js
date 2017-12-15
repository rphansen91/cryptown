import { ApolloProvider } from 'react-apollo';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import client from './gql/client';
import registerServiceWorker from './registerServiceWorker';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import grey from 'material-ui/colors/grey';
import lightBlue from 'material-ui/colors/lightBlue';
import { BrowserRouter } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: grey,
    secondary: lightBlue,
  }
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ApolloProvider>
  </BrowserRouter>
, document.getElementById('root'));

registerServiceWorker();
