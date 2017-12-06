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

const theme = createMuiTheme({
  palette: {
    primary: grey,
    secondary: lightBlue,
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </ApolloProvider>
, document.getElementById('root'));
registerServiceWorker();
