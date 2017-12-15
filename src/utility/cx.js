export default (classes={}) =>
  Object.keys(classes)
  .filter(c => classes[c])
  .join(' ')
