export function sorter (key, inc=1) {
  return function (a, b) {
    return (a[key] - b[key]) * inc
  }
}

export function current (txs) {
  const portfolio = create(txs)
  const times = Object.keys(portfolio)

  return function (ts) {
    for (var i = times.length - 1; i >= 0; i--) {
      if (ts >= times[i]) {
        return portfolio[times[i]]
      }
    }
  }
}

export function create (txs) {
  let totals = {}
  return txs.sort(sorter('createdAt')).reduce(function (acc, tx) {
    if (!totals[tx.coin]) totals[tx.coin] = 0
    totals[tx.coin] += tx.value

    if (!acc[tx.createdAt]) acc[tx.createdAt] = Object.assign({}, totals)
    if (!acc[tx.createdAt][tx.coin]) acc[tx.createdAt][tx.coin] = 0
    acc[tx.createdAt][tx.coin] = totals[tx.coin]
    return acc
  }, {
    0: {
      'bitcoin': 0
    } // No portfolio at epoch
  })
}

export function empty (portfolio={}) {
  const add = (a, b) => a + b
  return Object.values(portfolio).reduce(add, 0) === 0
}

export const default_coins = [{ id: 'bitcoin', symbol: 'BTC'}, { id: 'ethereum', symbol: 'ETH'}, { id: 'litecoin', symbol: 'LTC'}, {id: 'bitcoin-cash', symbol: 'BCH'}, {id: 'ripple', symbol: 'XRP'}, {id: 'dash', symbol: 'DASH'}, {id: 'monero', symbol: 'XRM'}]

export function allCoins (txs, defaultCoins=default_coins) {
  const coins = Object.values(txs.reduce((acc, tx) => {
      acc[tx.coin] = { id: tx.coin, symbol: tx.symbol }
      return acc
    },
    {}
  ))
  return coins.length ? coins : defaultCoins
}
