const mock = (...args) => console.info('Mocklytics', ...args)

export const active = (fn, name) => {
  return (...args) => {
    if (process.env.REACT_APP_GA) fn(...args)
    else mock(name, ...args)
  }
}

export const init = active(() => {
  require('react-ga').default.initialize(process.env.REACT_APP_GA)
}, 'Initialize')

export const pageview = active(() => {
  require('react-ga').default.pageview(window.location.pathname + window.location.search)
}, 'Page View')

export const event = active((category, action, label, value) => {
  require('react-ga').default.event({ category, action, label, value })
}, 'Event')
