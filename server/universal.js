require.extensions['.svg'] = function (module, filename) {
  module.exports = fs.readFileSync(filename.replace('!raw-loader!', ''), 'utf8');
};

import path from 'path';
import fs from 'fs';
import fetch from 'node-fetch';

import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import { ApolloProvider } from 'react-apollo';

import { Provider } from 'react-redux';
import { Route, StaticRouter } from 'react-router-dom';
import createServerStore from './store';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import preset from 'jss-preset-default';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';
import grey from 'material-ui/colors/grey';
import lightBlue from 'material-ui/colors/lightBlue';

import App from '../src/App';
import client from '../src/gql/client';
import { getDataFromTree } from "react-apollo"

const theme = createMuiTheme({
  palette: {
    primary: grey,
    secondary: lightBlue,
  }
});
const filePath = path.resolve(__dirname, '../build/index.html');
const htmlData = fs.readFileSync(filePath, 'utf8');
const prepHTML = (data, { html, head, body, css }) => {
  return data.replace('<html lang="en">', `<html ${html}`)
  .replace(/<!-- begin meta -->(.*)<!-- end meta -->/, head)
  .replace('</head>', `<style>${css}</style></head>`)
  .replace(/<div id="root">.*<\/div>/, `<div id="root">${body}</div>`)
};

const universalLoader = (req, res) => {
  const sheetsRegistry = new SheetsRegistry();
  const jss = create(preset());
  const { store } = createServerStore(req.path);

  jss.options.createGenerateClassName = createGenerateClassName;
  const apolloClient = client(fetch)
  const app = (
    <StaticRouter location={ req.url } context={ {} }>
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <JssProvider registry={sheetsRegistry} jss={jss}>
            <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
              <App />
            </MuiThemeProvider>
          </JssProvider>
        </ApolloProvider>
      </Provider>
    </StaticRouter>
  );

  getDataFromTree(app).then(() => {
    const css = sheetsRegistry.toString();
    const helmet = Helmet.renderStatic();
    const routeMarkup = renderToString(app);
    const initialState = apolloClient.extract();
    const html = prepHTML(htmlData, {
      state: initialState,
      html: helmet.htmlAttributes.toString(),
      head:
        helmet.title.toString() +
        helmet.meta.toString() +
        helmet.link.toString(),
      css: css,
      body: routeMarkup
    });

    res.send(html);
  });

};

export default universalLoader;
