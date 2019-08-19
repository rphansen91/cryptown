import React from "react";
import Typography from "@material-ui/core/Typography";

export default ({ onClick, style }) => (
  <Typography variant="h4" onClick={onClick} style={style}>
    <img
      alt="Logo"
      src={(process.env.PUBLIC_URL || "") + "/icon.png"}
      style={{ height: "1em", marginRight: 4, borderRadius: "0.1em" }}
    />{" "}
    Hodl Stream
  </Typography>
);
