import { sorter } from '../../portfolio/compute'

export const SET_TXS = 'SET_TRANSACTIONS'

export const setTxs = payload => ({
  type: SET_TXS,
  payload
})

const txs = (state = [], action) => {
  switch (action.type) {
    case SET_TXS:
      return [].concat(action.payload).sort(sorter('createdAt', -1))
    default:
      return state
  }
}

export default txs
