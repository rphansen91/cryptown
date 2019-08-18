require.extensions[".svg"] = function(module, filename) {
  module.exports = fs.readFileSync(
    filename.replace("!raw-loader!", ""),
    "utf8"
  );
};

import path from "path";
import fs from "fs";
import fetch from "node-fetch";

import React from "react";
import { renderToString } from "react-dom/server";
import Helmet from "react-helmet";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import { Route, StaticRouter } from "react-router-dom";
import createServerStore from "./store";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { SheetsRegistry } from "react-jss/lib/jss";
import { ServerStyleSheets, ThemeProvider } from "@material-ui/styles";
import { createGenerateClassName } from "@material-ui/styles";
import JssProvider from "react-jss/lib/JssProvider";
import grey from "@material-ui/core/colors/grey";
import lightBlue from "@material-ui/core/colors/lightBlue";
import { routes } from "../src/Routes";
import App from "../src/App";
import client from "../src/gql/server";
import { renderToStringWithData } from "react-apollo";
import manifest from "../build/asset-manifest.json";

const filePath = path.resolve(__dirname, "../build/index.html");
// const cssPath = path.resolve(__dirname, `../build/${manifest["main.css"]}`);
const htmlData = fs.readFileSync(filePath, "utf8");
// const cssData = fs.readFileSync(cssPath, "utf8");
const prepHTML = (data, { html, head, body, css, state }) => {
  return data
    .replace('<html lang="en">', `<html ${html}>`)
    .replace("<head>", "<head>" + head)
    .replace("</head>", `<style id="jss-server-side">${css}</style></head>`)
    .replace(
      "</head>",
      `<script>window.__APOLLO_STATE__=${JSON.stringify(state).replace(
        /</g,
        "\\u003c"
      )}</script></head>`
    )
    .replace(/<div id="root">.*<\/div>/, `<div id="root">${body}</div>`);
  // .replace("</body>", "<script src=" + manifest["main.js"] + "></script>");
};

const universalLoader = (req, res) => {
  const sheets = new ServerStyleSheets();
  const { store } = createServerStore(req.path);
  const apolloClient = client(fetch);
  const theme = createMuiTheme({
    palette: {
      primary: grey,
      secondary: lightBlue
    }
  });
  const context = {};
  const ServerApp = () =>
    sheets.collect(
      <StaticRouter location={req.url} context={context}>
        <Provider store={store}>
          <ApolloProvider client={apolloClient}>
            <MuiThemeProvider theme={theme}>
              <App />
            </MuiThemeProvider>
          </ApolloProvider>
        </Provider>
      </StaticRouter>
    );

  Promise.resolve()
    .then(() => {
      // const ext = mime.lookup(req.path);
      console.log(req.headers, req.path, req.path.includes("."));
      if (req.path.includes(".")) {
        throw new Error(`${req.path} Not Found`);
      }
    })
    // .then(() => renderToString(<ServerApp />))
    .then(() => renderToStringWithData(<ServerApp />))
    .then(body => {
      console.log("got body");
      const helmet = Helmet.renderStatic();
      const initialState = apolloClient.extract();
      const css = sheets.toString();
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
