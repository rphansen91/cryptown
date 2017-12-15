import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Home from './ui/Home';
import About from './ui/About';
import NotFound from './ui/NotFound';
import GraphiQL from './explorer/GraphiQL';
import Add from './portfolio/Add';

class Routes extends Component {
  constructor (props) {
    super(props)
  }

  componentDidUpdate (prevProps) {
    if (this.props.location !== prevProps.location) {
      this.props.onRouteChanged(this.props.location)
    }
  }

  render () {
    const props = this.props
    return <Switch>
      <Route exact path={process.env.PUBLIC_URL + "/"} component={() => <Home coins={props.coins} pair={props.pair}/> } />
      <Route path={process.env.PUBLIC_URL + "/about"} component={About} />
      {/* <Route path={process.env.PUBLIC_URL + "/txs"} component={Transactions} /> */}
      <Route path={process.env.PUBLIC_URL + "/add"} component={Add} />
      <Route path={process.env.PUBLIC_URL + "/gql"} component={() => <GraphiQL style={{height: '80vh', textAlign: 'initial'}}/>} />
      <Route path="*" component={NotFound} />
    </Switch>
  }
}

export default withRouter(Routes);
