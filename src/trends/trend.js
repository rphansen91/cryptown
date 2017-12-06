import { sample, history } from './providers'
import { now } from '../time'

export default function (coin, fiat) {
  return function ({ start = 0, end = now(), g } = {}) {
    return history({ coin, fiat, start, end, g })
  }
}
