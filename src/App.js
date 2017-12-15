import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { btcUsdTrend } from './trends'
import Coin from './explorer/Coin';
import CryptoIcon from './icons/CryptoIcon';
import coinColor from './icons/colors';
import { main } from './icons/icons';
import Portfolio from './portfolio/Portfolio';
import { allCoins } from './portfolio/compute';
import Trend from './explorer/Trend';
import txStore from './portfolio/txs';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import AddTx from './portfolio/Add';
import Pairs from './portfolio/Pairs';
import Current from './portfolio/Current';
import Details from './explorer/Details';
import GraphiQL from './explorer/GraphiQL';
import Footer from './ui/Footer';
import Routes from './Routes';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui-icons/Close';
import NavigationMenu from 'material-ui-icons/Menu';
import Menu from './ui/Menu';
import isMobile from './utility/isMobile';
import cx from './utility/cx';
import './App.css';

const defaultCoins = ['bitcoin', 'ethereum', 'litecoin']
const pairs = ['USD', /*'EUR',*/ 'BTC']
let icons = main()

class App extends Component {
  constructor (props) {
    super(props)
    this.txStore = txStore();
    this.state = {
      pair: pairs[0],
      addr: "19SokJG7fgk8iTjemJ2obfMj14FM16nqzj",
      txs: [],
      menu: false,
      adding: false,
      location: {},
      mobile: isMobile()
    }
  }
  componentWillMount () {
    this.txStore.get()
    .then(txs => txs || [])
    .then(txs => {
      this.setState({ txs, coins: allCoins(txs) })
    });

    this.txStore.on('change', txs => {
      this.setState({ txs, coins: allCoins(txs) })
    })

    if (!isMobile()) {
      window.addEventListener('resize', () => {
        this.setState({ mobile: window.innerWidth < 800 })
      })
    }
  }
  setPair (pair) {
    this.setState({ pair })
  }
  addingTx (adding) {
    this.setState({ adding })
  }
  submitTx (txs, close) {
    this.setState({ adding: !close })
    this.txStore.save(txs)
  }
  toggleMenu () {
    this.setState({ menu: !this.state.menu })
  }
  closeMenu () {
    this.setState({ menu: false })
  }
  render() {
    let { location, history } = this.props
    let { coins, txs, adding, pair, menu, mobile } = this.state
    if (!coins || !coins.length) {
      coins = defaultCoins
    }

    return (
      <div>
        <Menu permanent={!mobile} open={menu} onClose={this.closeMenu.bind(this)} />
        <div className={cx({
          "App": true,
          "permanent": !mobile,
          "open": menu
        })}>
          <AppBar
            position="static"
            style={{background: "#222"}}>
            <Toolbar>
              <IconButton onClick={this.toggleMenu.bind(this)} color="contrast" aria-label="Menu">
                { menu ? <NavigationClose color="#fff" /> : <NavigationMenu color="#fff" /> }
              </IconButton>
              <Typography type="title" style={{color: "#fff"}}>Block Dock</Typography>
              <div style={{flex: "1 1 auto"}} />
              <Pairs value={pair} values={pairs} onChange={this.setPair.bind(this)} />
            </Toolbar>

            <div style={{ display: (location.pathname === process.env.PUBLIC_URL + '/') ? 'initial' : 'none', overflow: 'hidden' }}>
              <Current className="white-text" txs={txs} style={{marginTop: '1em'}} />
              <Portfolio title="" txs={txs} pair={pair} />
            </div>
          </AppBar>

          <Routes coins={coins} pair={pair} onRouteChanged={this.closeMenu.bind(this)} />
          <Footer />

          <Button fab color="primary" onClick={this.addingTx.bind(this, true)} style={{position: "fixed", bottom: 10, right: 10}}>
            <AddIcon color="#fff" />
          </Button>
          <AddTx txs={txs} open={adding} onClose={this.addingTx.bind(this, false)} onSubmit={this.submitTx.bind(this)} />
        </div>
      </div>
    )
  }
}

export default withRouter(App);
