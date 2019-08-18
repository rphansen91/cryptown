import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { compose } from "redux";
import { withMenu } from "./store/reducers/menu";
import Home from "./ui/Home";
import About from "./ui/About";
import NotFound from "./ui/NotFound";
import Post from "./ui/Post";
import GraphiQL from "./explorer/GraphiQL";
import Add from "./ui/Add";
import Blog from "./ui/Blog";
import Shop from "./ui/Shop";
import Coin from "./ui/Coin";
import Terms from "./ui/Terms";
import Transactions from "./ui/Txs";
import Settings from "./ui/Settings";
import { init, pageview } from "./utility/analytics";

export const routes = {
  "/": Home,
  "/about": About,
  "/tx": Transactions,
  "/add": Add,
  "/blog": Blog,
  "/shop": Shop,
  "/terms": Terms,
  "/settings": Settings,
  "/gql": () => (
    <GraphiQL
      style={{
        position: "relative",
        height: "80vh",
        textAlign: "initial"
      }}
    />
  ),
  "/coin/:id": props => <Coin id={props.match.params.id} />,
  "/post/:from": props => <Post id={props.match.params.id} {...props} />
};

class Routes extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    init();
    pageview();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.props.closeMenu();
      (window.scroll || (v => v))(0, 0);
      pageview();
    }
  }

  render() {
    return (
      <div className="content">
        <Switch>
          {Object.keys(routes).map(path => (
            <Route exact key={path} path={path} component={routes[path]} />
          ))}
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default compose(
  withRouter,
  withMenu
)(Routes);
