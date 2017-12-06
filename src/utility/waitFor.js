export default time => value => new Promise(res => setTimeout(() => res(value), time))
