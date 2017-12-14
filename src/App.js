import React, { Component } from 'react';
import { btcUsdTrend } from './trends'
import Wallet from './explorer/Wallet';
import Coin from './explorer/Coin';
import CryptoIcon from './icons/CryptoIcon';
import coinColor from './icons/colors';
import { main } from './icons/icons';
import Portfolio from './portfolio/Portfolio';
import { allCoins } from './portfolio/compute'
import Trend from './explorer/Trend';
import txStore from './portfolio/txs';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import AddTx from './portfolio/Add';
import Pairs from './portfolio/Pairs';
import Current from './portfolio/Current';
import Details from './explorer/Details';
import GraphiQL from './explorer/GraphiQL';
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
      txs: []
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
  render() {
    let { coins, txs, adding, pair } = this.state
    if (!coins || !coins.length) {
      coins = defaultCoins
    }

    return (
      <div className="App">
        <AppBar position="static" style={{background: "#222"}}>
          <Toolbar>
            <Typography type="title" style={{color: "#fff"}}>Block Dock</Typography>
            <div style={{flex: "1 1 auto"}} />
            <Pairs value={pair} values={pairs} onChange={this.setPair.bind(this)} />
          </Toolbar>

          <Current className="white-text" txs={txs} style={{marginTop: '1em'}} />

          <Portfolio title="" txs={txs} pair={pair} />
        </AppBar>
        {/* <Wallet addr={this.state.addr} /> */}

        {/* <section>
          <Typography type="title">
            Icons
          </Typography>
          <div className="icons">
            { icons.map((icon, i) => <CryptoIcon icon={icon} attrs={attrs} key={i} />) }
          </div>
        </section> */}

        <section>
          <Typography type="title">Tickers</Typography>
          <div className="icons">
            { coins.map(coin => <Coin color={coinColor(coin)} key={coin} id={coin} />) }
          </div>
        </section>

        <section>
          <Typography type="title">Trends</Typography>
          <div className="icons responsive">
            { coins.map(c => <Trend key={c} color={coinColor(c)} id={c} pair={pair} />) }
          </div>
        </section>

        {/* <section style={{ height: '100vh', textAlign: 'initial' }}>
          <GraphiQL />
        </section> */}

        <Button fab color="primary" onClick={this.addingTx.bind(this, true)} style={{position: "fixed", bottom: 10, right: 10}}>
          <AddIcon color="#fff" />
        </Button>
        <AddTx txs={txs} open={adding} onClose={this.addingTx.bind(this, false)} onSubmit={this.submitTx.bind(this)} />
      </div>
    );
  }
}

export default App;
