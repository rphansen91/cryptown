import storage from '../utility/storage'

const defaultTxs = [{symbol: 'BTC', coin: 'bitcoin', value: 0}, {symbol: 'LTC', coin: 'litecoin', value: 0}, {symbol: 'ETH', coin: 'ethereum', value: 0}]

export default function () {
  const emitter = {}
  const listeners = {}
  const store = storage('txs')
  emitter.add = function (tx) {
    return store.get()
    .then(txs => (txs || []).concat(tx))
    .then(txs => store.save(txs))
    .then(txs => {
      emitter.emit('change', txs)
      return txs
    })
  }
  emitter.get = function () {
    return store.get()
    .catch(() => defaultTxs)
  }
  emitter.save = function (txs) {
    return store.save(txs)
    .then(txs => {
      emitter.emit('change', txs)
      return txs
    })
  }
  emitter.on = function (name, fn) {
    if (typeof fn !== 'function') return
    if (!listeners[name]) listeners[name] = []
    listeners[name].push(fn)
  }
  emitter.emit = function (name, data) {
    if (!listeners[name]) return
    listeners[name].forEach(function (fn) {
      fn(data)
    })
  }
  return emitter
}
