const colors = {
  'bitcoin': '#f9a540',
  'btc': '#f9a540',
  'eth': '#444444',
  'ethereum': '#444444',
  'ltc': '#999999',
  'litecoin': '#999999'
}

export default (symbol='') => colors[symbol.toLowerCase()] || ''
