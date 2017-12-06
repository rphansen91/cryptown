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
  return txs.reduce(function (acc, tx) {
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

export function allCoins (txs, defaultCoins=[]) {
  const coins = Object.keys(txs.reduce((acc, tx) => {
    acc[tx.coin] = true
    return acc
  }, {}))
  return coins.length ? coins : defaultCoins
}
