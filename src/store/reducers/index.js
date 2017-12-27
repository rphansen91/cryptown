import { combineReducers } from 'redux'
import txs from './transactions'
import adding from './adding'
import pair from './pair'
import menu from './menu'
import coins from './coins'

const app = combineReducers({
  txs,
  adding,
  coins,
  menu,
  pair
})

export default app
