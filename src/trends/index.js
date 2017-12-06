import coins from './coins'
import fiats from './fiats'
import trend from './trend'

const { btc } = coins
const { usd } = fiats

export const btcUsdTrend = trend(btc.symbol, usd.symbol)
