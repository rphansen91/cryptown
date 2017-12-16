import React, { Component } from 'react';
import { connect } from 'react-redux';
import txStore from './txs';
import CryptoIcon from '../icons/CryptoIcon';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { DatePicker } from 'material-ui-pickers';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import { graphql } from 'react-apollo';
import { allCoins, current, create } from './compute';
import { defaultColor } from '../utility/styles';
import { setTxs } from '../store/reducers/transactions'
import moment from 'moment';
import List from 'material-ui/List';
import Tx from './Tx';
import gql from 'graphql-tag';

const loadAllCoins = gql`
query AllCoins {
  coins {
    id
    name
    symbol
  }
}
`

const attrs = "fill='"+defaultColor+"' height='1em' style='vertical-align: text-top; margin: 0 0.2em;'"
const initial = () => ({ coin: 'bitcoin', value: '', createdAt: moment(), errors: {} })
class AddTx extends Component {
  constructor (props) {
    super(props)
    this.state = initial()
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
    const { onSubmit=(v=>v), data: { coins } } = this.props
    const { coin, value, createdAt } = this.state

    if (!coin) return this.setState({ errors: this.errors('coin', true) })
    if (!value || isNaN(Number(value))) return this.setState({ errors: this.errors('value', true) })
    if (!createdAt.isValid()) return this.setState({ errors: this.errors('createdAt', true) })

    const { symbol } = coins.find(({ id }) => id === coin)
    onSubmit({ coin, symbol, value: Number(value), createdAt: createdAt.valueOf() / 1000 })
    this.setState(initial())
  }
  remove (i) {
    const { onChange=(v=>v), txs=[] } = this.props
    onChange(txs.slice(0, i).concat(txs.slice(i + 1)))
  }
  render () {
    const {
      data: {loading, error, coins},
      open=false,
      onClose=(v=>v),
      txs=[]
    } = this.props
    const { coin, value, createdAt, errors } = this.state
    return <div>
      <section />
      <section>
        <DialogTitle>{ error ? error.message : "New Transaction" }</DialogTitle>
        <div className="add-form">
          <form onSubmit={this.submit.bind(this)}>
            <TextField value={value} error={errors.value} label="Coin Count" onChange={this.addChange('value', ev => ev.target.value)}  />
            <Select
              error={errors.coin}
              onChange={this.addChange('coin', ev => ev.target.value)}
              value={coin}
              >
              { (coins || []).map(coin =>
                <MenuItem key={coin.id} value={coin.id}>
                  <CryptoIcon attrs={attrs} icon={coin.symbol} /> { coin.name }
                </MenuItem>) }
            </Select>
            <div style={{marginTop: '1em'}}/>
            <DatePicker value={createdAt}
              error={errors.date}
              label="Trade Date"
              leftArrowIcon={<CryptoIcon icon="BTC" attrs={attrs} />}
              rightArrowIcon={<CryptoIcon icon="BTC" attrs={attrs} />}
              onChange={this.addChange('createdAt')}
              fullWidth />
            <div className="text-center">
              <Button type="submit" raised style={{margin: '1em'}}>Add</Button>
            </div>
          </form>
          <List>
            { txs.map((tx, i) => <Tx key={i} tx={tx} onRemove={() => this.remove(i)} />) }
          </List>
          </div>
      </section>
    </div>
  }

}

const store = txStore()
const mapStateToProps = ({ txs }) => ({ txs })
const mapDispatchToProps = dispatch => ({
  onSubmit: (tx) => {
    console.log('ADDING', tx)
    store.add(tx).then((txs) => dispatch(setTxs(txs)))
  },
  onChange: (txs) => {
    store.save(txs).then(txs => dispatch(setTxs(txs)))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(graphql(loadAllCoins)(AddTx))
