import React from "react";
import CryptoIcon from "./CryptoIcon";
import icons from "./icons";
import { defaultColor } from "../utility/styles";
import { withTheme } from "material-ui/styles";
import { Link } from "react-router-dom";

const mainCoins = icons.main();
export default withTheme()(
  ({
    theme: {
      palette: {
        action: { active: color }
      }
    }
  }) => (
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
            attrs={{
              fill: "rgba(255,255,255)" || color
            }}
            icon={icon}
          />
        </Link>
      ))}
    </div>
  )
);
