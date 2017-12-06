import qs from '../../utility/qs'
import { zipObject, map } from 'lodash'
import { iso } from '../../time'

const MAX_DATA_POINTS = 200
const uppercase = s => (s || '').toUpperCase()
const productId = (coin, fiat) => [coin, fiat].map(uppercase).join('-')
const granularity = (start, end) => {
  // Return time series in seconds
  return (end - start) / MAX_DATA_POINTS / 1000
}

const parse = function (v) {
  return zipObject(['time', 'low', 'high', 'open', 'close', 'volume'], v)
}

const history = function ({ coin, fiat, start, end, g }) {
  const values = []
  const url = [
    'https://api.gdax.com/products/',
    productId(coin, fiat),
    '/candles',
    qs({ start: iso(start), end: iso(end), granularity: g })
  ].join('')
  return fetch(url)
  .then(r => r.json())
  .then(r => map(r, parse))
}

const sample = function ({ coin, fiat }) {
  return Promise.resolve()
}

export default {
  history,
  sample
}
