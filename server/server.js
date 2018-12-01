import bodyParser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import express from "express";
import path from "path";
import throng from "throng";
import useCryptoIcon from "./icon";
import universalLoader from "./universal";

const port = process.env.PORT || 8081;
const workers = require("os").cpus().length; //Number(process.env.WORKERS)
const lifetime = Number(process.env.LIFETIME) || Infinity;
const morganFormat =
  process.env.MORGAN_FORMAT ||
  ":id :date[clf] :host :method :url :status :res[content-length] - :response-time ms";

throng({ start, workers, lifetime });

function isMalicious() {
  return false;
}

function start(id) {
  const app = express();
  const get = require("force-secure-express/src/get");
  const forceSecure = require("force-secure-express");
  const { blockHosts, blockRequest, blockQualys } = require("./block");

  morgan.token("id", () => id);
  morgan.token("host", req => get(req, "headers.host"));
  app.use(morgan(morganFormat));
  app.use(blockQualys);
  app.use(blockHosts(["ec2-100-25-64-237.compute-1.amazonaws.com"]));
  app.use(blockRequest(isMalicious));
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use("/svg", useCryptoIcon(path.resolve(__dirname, "../build/svg")));
  app.use(forceSecure(["hodlstream.com", "www.hodlstream.com"]));
  app.use(
    express.static(path.resolve(__dirname, "../build"), { index: false })
  );
  app.use("/", universalLoader);

  app.listen(port, () => {
    console.log(`Worker ${id} listening on port ${port}!`);
  });

  app.on("error", error => {
    console.log(id, error);
  });
}
