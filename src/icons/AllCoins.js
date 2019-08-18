import React from "react";
import CryptoIcon from "./CryptoIcon";
import icons from "./icons";
import { Link } from "react-router-dom";

const mainCoins = icons.main();

export default () => (
  <div className="icons">
    {mainCoins.map((icon, i) => (
      <Link key={i} aria-label={icon} to={"/coin/" + icon}>
        <CryptoIcon
          button="true"
          btnstyle={{ margin: 6 }}
          style={{
            height: "100%",
            width: "100%"
          }}
          icon={icon}
        />
      </Link>
    ))}
  </div>
);
