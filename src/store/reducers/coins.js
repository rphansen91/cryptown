import { SET_TXS } from './transactions'
import { allCoins } from '../../portfolio/compute'

const coins = (state = [], action) => {
  switch (action.type) {
    case SET_TXS:
      return allCoins(action.payload)
    default:
      return state
  }
}

export default coins
