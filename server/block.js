const createWhitelist = require("force-secure-express/src/whitelist");
const get = require("force-secure-express/src/get");

const getHost = req => get(req, "headers.host");
const getQualys = req => get(req, "headers.qualys-scan");
const isQualysVM = req => getQualys(req) === "VM";

module.exports = function blockHosts(hosts) {
  const whitelist = createWhitelist(hosts);

  function isMatch(req) {
    if (!hosts) return false;
    const host = getHost(req);
    return whitelist[host];
  }

  return function(req, res, next) {
    if (isQualysVM(req) || isMatch(req)) {
      res.writeHead(504);
      res.end("Invalid Request");
      return;
    }

    next();
  };
};
