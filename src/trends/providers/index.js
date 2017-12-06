import gdax from './gdax'

export const history = function (opts) {
  return Promise.all([
    gdax.history(opts)
  ])
}

export const sample = function (opts) {
  return Promise.resolve([
    gdax.sample(opts)
  ])
}
