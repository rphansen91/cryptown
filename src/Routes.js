import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { closeMenu } from './store/reducers/menu';
import Home from './ui/Home';
import About from './ui/About';
import NotFound from './ui/NotFound';
import Post from './ui/Post';
import GraphiQL from './explorer/GraphiQL';
import Add from './ui/Add';
import Blog from './ui/Blog';
import Coin from './ui/Coin';
import Terms from './ui/Terms';
import Transactions from './ui/Txs';
import Settings from './ui/Settings';
import { init, pageview } from './utility/analytics';

class Routes extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    init()
    pageview()
  }

  componentDidUpdate (prevProps) {
    if (this.props.location !== prevProps.location) {
      this.props.closeMenu()
      pageview()
    }
  }

  render () {
    return <div className="content">
      <Switch>
        <Route exact path={(process.env.PUBLIC_URL || '') + "/"} component={Home} />
        <Route path={(process.env.PUBLIC_URL || '') + "/about"} component={About} />
        <Route path={(process.env.PUBLIC_URL || '') + "/tx"} component={Transactions} />
        <Route path={(process.env.PUBLIC_URL || '') + "/add"} component={Add} />
        <Route path={(process.env.PUBLIC_URL || '') + "/blog"} component={Blog} />
        <Route path={(process.env.PUBLIC_URL || '') + "/gql"} component={() => <GraphiQL style={{position: 'relative', height: '80vh', textAlign: 'initial'}}/>} />
        <Route path={(process.env.PUBLIC_URL || '') + "/coin/:id"} component={(props) => <Coin id={props.match.params.id} />} />
        <Route path={(process.env.PUBLIC_URL || '') + "/post/:q/:from"} component={(props) => <Post id={props.match.params.id} {...props} />} />
        <Route path={(process.env.PUBLIC_URL || '') + "/terms"} component={Terms} />
        <Route path={(process.env.PUBLIC_URL || '') + "/settings"} component={Settings} />
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
