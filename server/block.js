const createWhitelist = require("force-secure-express/src/whitelist");
const get = require("force-secure-express/src/get");

const getPath = req => get(req, "path");
const getHost = req => get(req, "headers.host");
const getQualys = req => get(req, "headers.qualys-scan");
const isQualysVM = req => getQualys(req) === "VM";

const blockRequest = (
  shouldBlockCb = v => false,
  message = "Invalid Request"
) => (req, res, next) => {
  if (shouldBlockCb(req)) {
    console.log("Blocked", getPath(req), getHost(req), message);
    res.writeHead(504);
    res.end(message);
  } else {
    next();
  }
};

const blockQualys = blockRequest(isQualysVM, "Invalid VM");

const blockHosts = function(hosts) {
  const whitelist = createWhitelist(hosts);

  function isMatch(req) {
    if (!hosts) return false;
    const host = getHost(req);
    return whitelist[host];
  }

  return blockRequest(isMatch, "Invalid Host");
};

module.exports = {
  blockRequest,
  blockQualys,
  blockHosts
};
