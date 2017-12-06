const display = value => typeof value === 'number' ? ['$', value.toFixed(2), ' USD'].join('') : ''

export default {
  display
}
