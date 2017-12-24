import ReactGA from 'react-ga';

const mock = (...args) => console.info('Mocklytics', ...args)

export const active = (fn, name) => {
  return (...args) => {
    if (process.env.REACT_APP_GA) fn(...args)
    else mock(name, ...args)
  }
}

export const init = active(() => {
  ReactGA.initialize(process.env.REACT_APP_GA)
}, 'Initialize')

export const pageview = active(() => {
  ReactGA.pageview(window.location.pathname + window.location.search)
}, 'Page View')

export const event = active((category, action, label, value) => {
  ReactGA.event({ category, action, label, value })
}, 'Event')
