import React, { Component } from 'react';
import { btcUsdTrend } from './trends'
import Wallet from './explorer/Wallet';
import Coin from './explorer/Coin';
import CryptoIcon from './icons/CryptoIcon';
import { main } from './icons/icons';
import ChartProvider from './charts/Provider';
import Stream from './charts/Stream';
import Portfolio from './portfolio/Portfolio';
import { allCoins } from './portfolio/compute'
import Trend from './explorer/Trend';
import txStore from './portfolio/txs';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import AddTx from './portfolio/Add';
import './App.css';

const defaultCoins = ['bitcoin', 'ethereum', 'litecoin']
let icons = main()

class App extends Component {
  constructor (props) {
    super(props)
    this.txStore = txStore();
    this.state = {
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
  addingTx (adding) {
    this.setState({ adding })
  }
  submitTx (tx) {
    this.setState({ adding: false })
    this.txStore.add(tx)
  }
  render() {
    let { coins, txs, adding } = this.state
    if (!coins || !coins.length) {
      coins = defaultCoins
    }

    return (
      <div className="App">
        <AppBar position="static" style={{background: "#222"}}>
          <Toolbar>
            <Typography type="title" style={{color: "#fff"}}>
              Welcome to Cryptown
            </Typography>
            <IconButton style={{float: "right"}} color="contrast" aria-label="Add" onClick={this.addingTx.bind(this, true)}>
              <AddIcon color="#fff" />
            </IconButton>
          </Toolbar>
        </AppBar>
        {/* <Wallet addr={this.state.addr} /> */}

        {/* <section>
          <h1>Icons</h1>
          <div className="icons">
            { icons.map((icon, i) => <CryptoIcon icon={icon} attrs={attrs} key={i} />) }
          </div>
        </section> */}

        <section>
          <h1>Tickers</h1>
          <div className="icons">
            { coins.map(coin => <Coin key={coin} id={coin} />) }
          </div>
        </section>

        <ChartProvider>
          <section>
            <h1>Trends</h1>
            <div className="icons">
              { coins.map(c => <Trend key={c} id={c} pair="USD" />) }
            </div>
          </section>

          <section>
            <Portfolio title="Cryptocurrency Portfolio" txs={txs} pair="USD" />
          </section>
        </ChartProvider>

        <AddTx open={adding} onClose={this.addingTx.bind(this, false)} onSubmit={this.submitTx.bind(this)} />
      </div>
    );
  }
}

export default App;
