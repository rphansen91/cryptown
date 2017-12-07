const yesOrNo = fn => (yes, no) => (...args) => {
  if (fn(...args)) return yes(...args)
  return no(...args)
}

const isNumber = yesOrNo(v => typeof v === 'number')
const toCurrency = v => v.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
const display = isNumber(
  (v) => '$' + toCurrency(v),
  () => ''
)

export default {
  display
}
