import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Portfolio from './portfolio/Portfolio';
import txStore from './portfolio/txs';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Pairs from './portfolio/Pairs';
import Current from './portfolio/Current';
import Footer from './ui/Footer';
import Routes from './Routes';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui-icons/Close';
import NavigationMenu from 'material-ui-icons/Menu';
import { toggleMenu } from './store/reducers/menu'
import { setTxs } from './store/reducers/transactions'
import Menu from './ui/Menu';
import Chat from './ui/Chat';
import cx from './utility/cx';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props)
    this.txStore = txStore();
  }

  goTo (route) {
    this.props.history.push(route)
  }

  componentWillMount () {
    this.txStore.get()
    .then(txs => txs || [])
    .then(txs => {
      this.props.setTxs(txs)
    });
  }

  render() {
    const { location, menu, toggleMenu } = this.props
    const display = (location.pathname === (process.env.PUBLIC_URL || '') + '/')

    return (
      <div>
        <Menu />
        <Chat page="hodlstream" page_id="139227580112499" app_id="857737644405026" />
        <div className={cx({ "App": true, "open": menu })}>
          <AppBar position="static" className={cx({
            "primary-gradient": true,
            "gradient-animated": menu
          })}>
            <Toolbar>
              <IconButton onClick={toggleMenu} color="contrast" aria-label="Menu" style={{width: 40, marginRight: 30}}>
                { menu ? <NavigationClose color="#fff" /> : <NavigationMenu color="#fff" /> }
              </IconButton>
              <Typography onClick={this.goTo.bind(this, (process.env.PUBLIC_URL || '') + '/')} type="title" style={{color: "#fff", cursor: "pointer", verticalAlign: "middle", display: "flex", flex: 1, justifyContent: "center"}}>
                <img src={(process.env.PUBLIC_URL || '') + '/icon.png'} style={{height: '1em', marginRight: 4, borderRadius: '0.1em'}} /> Hodl Stream
              </Typography>
              <Pairs style={{width: 70}} />
            </Toolbar>

            <div style={{ display: display ? 'initial' : 'none', overflow: 'hidden' }}>
              <Current className="white-text" style={{marginTop: '1em'}} />
              <Portfolio title="" />
            </div>
          </AppBar>

          <Routes />
          <Footer />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
  toggleMenu: () => dispatch(toggleMenu()),
  setTxs: (txs) => dispatch(setTxs(txs))
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
