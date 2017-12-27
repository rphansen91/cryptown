const fs = require('fs')
const pt = require('path')
const svg2png = require('svg2png')
const path = icon => pt.resolve(__dirname,  icon)
const dir = fs.readdirSync(path('../../public/svg/'))

const process = dir.map(function (icon) {
  const filepath = path('../../public/svg/' + icon)
  const outputpath = path('../../public/png/' + (icon.replace('.svg', '.png')))
  return new Promise(function (res, rej) {
    fs.readFile(filepath, function (err, data) {
      if (err) return rej(err)
      res(data)
    })
  })
  .then(buffer => svg2png(buffer, { width: 764, height: 400 }))
  .then(buffer => fs.writeFile(outputpath, buffer))
})

Promise.all(process)
.then(c => console.log('Done'))
.catch(e => console.log(e))
