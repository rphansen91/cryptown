import { combineReducers } from 'redux'
import txs from './transactions'
import adding from './adding'
import pair from './pair'
import menu from './menu'
import coins from './coins'
import profile from './profile'

const app = combineReducers({
  txs,
  adding,
  coins,
  menu,
  pair,
  profile
})

export default app
