const fs = require('fs')
const pt = require('path')
const path = icon => pt.resolve(__dirname,  icon)
const dir = fs.readdirSync(path('../../public/svg/'))
const wh_test = /width="\d+.\d+" height="\d+.\d+"|height="\d+.\d+" width="\d+.\d+"/
console.log(JSON.stringify(dir))

const process = dir.map(function (icon) {
  const filepath = path('../../public/svg/' + icon)
  const writepath = path('../../public/svg/' + icon)
  return new Promise(function (res, rej) {
    fs.readFile(filepath, 'utf8', function (err, data) {
      if (err) return rej(err)
      res(data)
    })
  })
  .then(function (svg) {
    fs.writeFileSync(writepath, svg.replace('fill="#005c97" viewBox', 'viewBox').replace(wh_test, ''), 'utf8')
    return wh_test.test(svg)
  })
})

const stats = {
  included: 0,
  not: 0,
  error: 0
}

process.reduce(function (acc, c) {
  return acc
  .then(() => c)
  .then(r => {
    if (r) stats.included++
    else stats.not++
  })
  .catch(err => {
    stats.error ++
  })
}, Promise.resolve())
.then(function (r) {
  console.log('Done', r, stats)
})
.catch(function (e) {
  console.log(e)
})
