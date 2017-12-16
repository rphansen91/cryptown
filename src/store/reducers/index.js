import { combineReducers } from 'redux'
import txs from './transactions'
import pair from './pair'
import menu from './menu'
import coins from './coins'

const app = combineReducers({
  txs,
  coins,
  menu,
  pair
})

export default app
