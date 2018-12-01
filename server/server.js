import bodyParser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import express from "express";
import path from "path";
import throng from "throng";
import useCryptoIcon from "./icon";
import universalLoader from "./universal";

const port = process.env.PORT || 8081;
const workers = Number(process.env.WORKERS) || 1;
const lifetime = Number(process.env.LIFETIME) || Infinity;
const morganFormat = id =>
  (
    process.env.MORGAN_FORMAT ||
    ":id :method :url :status :res[content-length] - :response-time ms"
  ).replace(":id", id);

throng({ start, workers, lifetime });

function start(id) {
  const app = express();
  const forceSecure = require("force-secure-express");
  const blockHosts = require("./block");

  app.use(morgan(morganFormat(id)));
  app.use(blockHosts(["ec2-100-25-64-237.compute-1.amazonaws.com"]));
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use("/svg", useCryptoIcon(path.resolve(__dirname, "../build/svg")));
  app.use(
    express.static(path.resolve(__dirname, "../build"), { index: false })
  );
  app.use(forceSecure(["hodlstream.com"]));
  app.use("/", universalLoader);

  app.listen(port, () => {
    console.log(`Worker ${id} listening on port ${port}!`);
  });

  app.on("error", error => {
    console.log(id, error);
  });
}
