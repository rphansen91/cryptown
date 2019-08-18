import { ApolloProvider } from "react-apollo";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import client from "./gql/client";
import { Provider } from "react-redux";
import { compose, createStore, applyMiddleware } from "redux";
import blockStore from "./store/reducers/index";
import grey from "@material-ui/core/colors/grey";
import thunk from "redux-thunk";
import lightBlue from "@material-ui/core/colors/lightBlue";
import { BrowserRouter } from "react-router-dom";
import storage from "./utility/storage";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancers(applyMiddleware(thunk));

initialStore()
  .then(initial => createStore(blockStore, initial, middleware))
  .then(render);

function initialStore() {
  const initial = window.__INITIAL_STATE__ || {};
  return storage("profile")
    .get()
    .then(profile => {
      initial.profile = profile || {};
      return initial;
    })
    .catch(() => initial);
}

function render(store) {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <ApolloProvider client={client(fetch)}>
          <App />
        </ApolloProvider>
      </Provider>
    </BrowserRouter>,
    document.getElementById("root")
  );
}
