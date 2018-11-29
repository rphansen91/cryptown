const fs = require("fs");

const toAttrs = obj => Object.keys(obj || {})
  .map(k => `${k}="${obj[k]}"`)
  .join(" ")

const defaultIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 226.8 226.8">
<path d="M113.4,59.6c-29.6,0-53.8,24.1-53.8,53.8c0,29.6,24.1,53.8,53.8,53.8c29.6,0,53.8-24.1,53.8-53.8S143,59.6,113.4,59.6z
	 M113.4,160.9c-26.2,0-47.6-21.3-47.6-47.6c0-26.2,21.3-47.6,47.6-47.6c26.2,0,47.6,21.3,47.6,47.6
	C160.9,139.6,139.6,160.9,113.4,160.9z"/>
<path d="M113.4,0C50.8,0,0,50.8,0,113.4s50.8,113.4,113.4,113.4S226.8,176,226.8,113.4S176,0,113.4,0z M113.4,185.3
	c-39.7,0-71.9-32.2-71.9-71.9s32.2-71.9,71.9-71.9s71.9,32.2,71.9,71.9S153.1,185.3,113.4,185.3z"/>
</svg>`

export default (publicPath) => {
  const cached = {}

  return (req, res, next) => {
    const iconPath = publicPath + req.url.split("?")[0]

    if (cached[iconPath]) return handleRequest(cached[iconPath]);

    fs.exists(iconPath, (exists) => {
      if (!exists) return notFound()
      fs.readFile(iconPath, 'utf8', function (e, d) {
        if (e || !d) return notFound()
        cached[iconPath] = d
        handleRequest(d)
      })
    })

    function sendSvg (svg) {
      res.writeHead(200, { 'Content-Type': 'image/svg+xml' })
      res.end(svg);
    }

    function handleRequest (icon) {
      const attrs = toAttrs(req.query)
      sendSvg(icon.replace('viewBox', (attrs ? attrs + ' viewBox' : 'viewBox')))
    }

    function notFound () {
      handleRequest(defaultIcon)
    }
  }
}