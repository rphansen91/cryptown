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
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';
import grey from 'material-ui/colors/grey';
import lightBlue from 'material-ui/colors/lightBlue';

import App from '../src/App';
import client from '../src/gql/server';
import { renderToStringWithData } from "react-apollo"
import manifest from "../build/asset-manifest.json"

const filePath = path.resolve(__dirname, '../build/index.html');
const cssPath = path.resolve(__dirname, `../build/${manifest["main.css"]}`);
const htmlData = fs.readFileSync(filePath, 'utf8');
const cssData = fs.readFileSync(cssPath, 'utf8');
const prepHTML = (data, { html, head, body, css, state }) => {
  console.log(state)
  return data.replace('<html lang="en">', `<html ${html}>`)
  .replace('<head>', '<head>' + head)
  .replace('</head>', `<style id="jss-server-side">${cssData} ${css}</style></head>`)
  .replace('</head>', `<script>window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')}</script></head>`)
  .replace(/<div id="root">.*<\/div>/, `<div id="root">${body}</div>`)
};

const universalLoader = (req, res) => {
  const sheetsRegistry = new SheetsRegistry();
  const { store } = createServerStore(req.path);
  const apolloClient = client(fetch);
  const theme = createMuiTheme({
    palette: {
      primary: grey,
      secondary: lightBlue,
    }
  });
  const generateClassName = createGenerateClassName()
  const sheetsManager = new Map()
  const context = {}
  const ServerApp = () => (
    <StaticRouter location={ req.url } context={context}>
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
              <App />
            </MuiThemeProvider>
          </JssProvider>
        </ApolloProvider>
      </Provider>
    </StaticRouter>
  );

  Promise.resolve()
  // .then(() => renderToString(<ServerApp />))
  .then(() => renderToStringWithData(<ServerApp />))
  .then((body) => {
    const helmet = Helmet.renderStatic();
    const initialState = apolloClient.extract();
    const css = sheetsRegistry.toString();
    const html = prepHTML(htmlData, {
      state: initialState,
      html: helmet.htmlAttributes.toString(),
      head:
        helmet.title.toString() +
        helmet.meta.toString() +
        helmet.link.toString(),
      css,
      body
    });

    res.send(html);
  })
  .catch(e => {
    console.log(e);
    res.send(htmlData);
  });

};

export default universalLoader;
