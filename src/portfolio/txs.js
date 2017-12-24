/* global localStorage */

const defaultTxs = [{symbol: 'BTC', coin: 'bitcoin', value: 0}, {symbol: 'LTC', coin: 'litecoin', value: 0}, {symbol: 'ETH', coin: 'ethereum', value: 0}]

const storage = function (name) {
  function get () {
    return Promise.resolve()
    .then(() => localStorage.getItem(name))
    .then(data => JSON.parse(data))
  }
  function save (item) {
    return Promise.resolve()
    .then(() => JSON.stringify(item))
    .then(data => localStorage.setItem(name, data))
    .then(() => item)
  }
  return { get, save }
}

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
    // return Promise.resolve(txExample)
    return store.get()
    .catch(() => defaultTxs)
  }
  emitter.save = function (txs) {
    // return Promise.resolve(txExample)
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

const txExample = [
  {
    createdAt: 1498262400,
    coin: 'bitcoin',
    value: 0.1
  },
  {
    createdAt: 1506902400,
    coin: 'bitcoin',
    value: -0.02
  },
  {
    createdAt: 1506902400,
    coin: 'ethereum',
    value: 1
  },
  {
    createdAt: 1511222400,
    coin: 'bitcoin',
    value: -0.02
  },
  {
    createdAt: 1511222400,
    coin: 'litecoin',
    value: 4
  }
]
