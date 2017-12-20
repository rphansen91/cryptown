import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { closeMenu } from './store/reducers/menu';
import Home from './ui/Home';
import About from './ui/About';
import NotFound from './ui/NotFound';
import GraphiQL from './explorer/GraphiQL';
import Add from './portfolio/Add';
import Coin from './ui/Coin';
import ReactGA from 'react-ga';

class Routes extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    console.log(process.env.REACT_APP_GA)
    if (process.env.REACT_APP_GA) {
      ReactGA.initialize(process.env.REACT_APP_GA)
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.location !== prevProps.location) {
      this.props.closeMenu()
      if (process.env.REACT_APP_GA) {
        ReactGA.pageview(window.location.pathname + window.location.search)
      }
    }
  }

  render () {
    return <div className="content">
      <Switch>
        <Route exact path={process.env.PUBLIC_URL + "/"} component={Home} />
        <Route path={process.env.PUBLIC_URL + "/about"} component={About} />
        {/* <Route path={process.env.PUBLIC_URL + "/txs"} component={Transactions} /> */}
        <Route path={process.env.PUBLIC_URL + "/add"} component={Add} />
        <Route path={process.env.PUBLIC_URL + "/gql"} component={() => <GraphiQL style={{position: 'relative', height: '80vh', textAlign: 'initial'}}/>} />
        <Route path={process.env.PUBLIC_URL + "/coin/:id"} component={(props) => <Coin id={props.match.params.id} />} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  }
}

export default withRouter(connect(
  () => ({}),
  dispatch => ({
    closeMenu: () => dispatch(closeMenu())
  })
)(Routes));
