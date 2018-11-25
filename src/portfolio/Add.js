import React, { Component } from 'react';
import { connect } from 'react-redux';
import txStore from './txs';
import CryptoIcon from '../icons/CryptoIcon';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { DatePicker } from 'material-ui-pickers';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import { graphql } from 'react-apollo';
import { allCoins, current, create } from './compute';
import { defaultColor } from '../utility/styles';
import { withTheme } from 'material-ui/styles';
import { setTxs } from '../store/reducers/transactions'
import moment from 'moment';
import List from 'material-ui/List';
import Tx from './Tx';
import gql from 'graphql-tag';
import { event } from '../utility/analytics';

const loadAllCoins = gql`
query AllCoins {
  all_coins {
    id
    name
    symbol
  }
}
`

const attrs = c => ({
  fill: c,
})
const iconStyle = ({
  height: "1em",
  "vertical-align": "top",
  "margin": "0 0.2em"
})
const initial = ({ coin='bitcoin', value='', errors={}, ...props}) => ({ coin, value, createdAt: props.createdAt ? moment(props.createdAt) : moment(props.createdAt), errors })
class AddTx extends Component {
  constructor (props) {
    super(props)
    this.state = initial(props)
  }
  errors (key, value) {
    if (!key) return this.state.errors
    return Object.assign({}, this.state.errors, { [key]: value })
  }
  addChange (key, fn=(v=>v)) {
    return (ev) => {
      const errors = this.errors(key, null)
      this.setState({ [key]: fn(ev), errors })
    }
  }
  submit (ev) {
    ev && ev.nativeEvent.preventDefault()
    const { onSubmit=(v=>v), data: { all_coins } } = this.props
    const { coin, value, createdAt } = this.state

    if (!coin) return this.setState({ errors: this.errors('coin', true) })
    if (!value || isNaN(Number(value))) return this.setState({ errors: this.errors('value', true) })
    if (!createdAt.isValid()) return this.setState({ errors: this.errors('createdAt', true) })

    const { symbol } = all_coins.find(({ id }) => id === coin)
    onSubmit({ coin, symbol, value: Number(value), createdAt: createdAt.valueOf() / 1000 })
    this.setState(initial(this.props))
  }
  remove (i) {
    const { onChange=(v=>v), txs=[] } = this.props
    onChange(txs.slice(0, i).concat(txs.slice(i + 1)))
  }
  render () {
    const {
      id,
      data: {loading, error, all_coins},
      open=false,
      onClose=(v=>v),
      txs=[],
      theme: { palette: { text: { secondary: color } } }
    } = this.props
    console.log(txs);
    const { coin, value, createdAt, errors } = this.state
    return <div>
      <section>
        <DialogTitle>{ error ? error.message : "New Transaction" }</DialogTitle>
        <Typography type="subtitle" color="secondary">&#9432; All transaction data is stored locally and will never be sent to our servers.</Typography>
      </section>
      <div>
        <section>
          <form onSubmit={this.submit.bind(this)}>
            <Select
              error={errors.coin}
              onChange={this.addChange('coin', ev => ev.target.value)}
              value={coin}
              fullWidth
              >
              { (all_coins || []).map(coin =>
                <MenuItem key={coin.id} value={coin.id}>
                  <CryptoIcon attrs={attrs(color)} icon={coin.symbol} style={iconStyle} /> { coin.name }
                </MenuItem>) }
            </Select>
            <div style={{marginTop: '1em'}}/>
            <TextField
            value={value}
            error={errors.value}
            label="Coin Count"
            onChange={this.addChange('value', ev => ev.target.value)}
            fullWidth />
            <div style={{marginTop: '1em'}}/>
            <DatePicker value={createdAt}
              error={errors.date}
              label="Trade Date"
              leftArrowIcon={<CryptoIcon icon="BTC" attrs={attrs(color)} style={iconStyle} />}
              rightArrowIcon={<CryptoIcon icon="BTC" attrs={attrs(color)} style={iconStyle} />}
              onChange={this.addChange('createdAt')}
              fullWidth />
            <div className="text-center">
              <Button type="submit" raised style={{margin: '1em'}}>Add</Button>
            </div>
          </form>
        </section>
        <section>
          <Typography type="title">All Transactions</Typography>
          <List className="text-initial">
            { txs.filter(({ value }) => value).map((tx, i) => <Tx key={i} tx={tx} onRemove={() => this.remove(i)} />) }
          </List>
        </section>
      </div>
    </div>
  }

}

const store = txStore()
const mapStateToProps = ({
  txs, adding
}) => ({ txs, createdAt: adding.createdAt, coin: adding.coin })
const mapDispatchToProps = dispatch => ({
  onSubmit: (tx) => {
    store.add(tx).then((txs) => dispatch(setTxs(txs)))
    if (tx.value >= 0) {
      event('transaction', 'buy', tx.coin, tx.value)
    } else {
      event('transaction', 'sell', tx.coin, tx.value)
    }
  },
  onChange: (txs) => {
    store.save(txs).then(txs => dispatch(setTxs(txs)))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(graphql(loadAllCoins)(withTheme()(AddTx)))
