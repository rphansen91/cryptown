import React from 'react'
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import List from 'material-ui/List';
import Tx from '../../portfolio/Tx';
import txStore from '../../portfolio/txs';
import { setTxs } from '../../store/reducers/transactions';
import remove from '../../utility/remove';
import SEO from '../SEO';
import './style.css'

const Txs = ({ txs, onChange=(v => v) }) =>
  <div>
    <SEO title={'Transactions | Hodl Stream'} path={'/tx'} />

    <section />
    <section>
      <Typography type="title">Transactions</Typography>
      <List>
        { txs.map((tx, i) => <Tx key={i} tx={tx} onRemove={() => onChange(remove(txs, i))} />) }
      </List>
    </section>
  </div>

const store = txStore()
export default connect(
  ({ txs }) => ({ txs }),
  dispatch => ({
    onChange: (txs) => {
      store.save(txs).then(txs => dispatch(setTxs(txs)))
    }
  })
)(Txs)
