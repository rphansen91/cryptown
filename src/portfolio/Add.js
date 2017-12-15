import React, { Component } from 'react';
import CryptoIcon from '../icons/CryptoIcon';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { DatePicker } from 'material-ui-pickers';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { graphql } from 'react-apollo';
import { allCoins, current, create, sorter } from './compute';
import { defaultColor } from '../utility/styles';
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
const initial = () => ({
  coin: 'bitcoin',
  value: '',
  createdAt: moment(),
  errors: {}
})
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
    const { onSubmit=(v=>v), txs=[], data: { coins } } = this.props
    const { coin, value, createdAt } = this.state

    if (!coin) return this.setState({ errors: this.errors('coin', true) })
    if (!value || isNaN(Number(value))) return this.setState({ errors: this.errors('value', true) })
    if (!createdAt.isValid()) return this.setState({ errors: this.errors('createdAt', true) })

    const { symbol } = coins.find(({ id }) => id === coin)
    onSubmit(txs.concat({ coin, symbol, value: Number(value), createdAt: createdAt.valueOf() / 1000 }), true)
    this.setState(initial())
  }
  remove (i) {
    const { onSubmit=(v=>v), txs=[] } = this.props
    onSubmit(txs.slice(0, i).concat(txs.slice(i + 1)))
  }
  render () {
    const {
      data: {loading, error, coins},
      open=false,
      onClose=(v=>v),
      txs=[]
    } = this.props
    const { coin, value, createdAt, errors } = this.state
    return <Dialog open={open} onRequestClose={onClose}>
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
          { txs.sort(sorter('createdAt', -1)).map((tx, i) => <Tx key={i} tx={tx} onRemove={() => this.remove(i)} />) }
        </List>
      </div>
    </Dialog>
  }

}

export default graphql(loadAllCoins)(AddTx)
