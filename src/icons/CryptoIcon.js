import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { useTheme } from "@material-ui/styles";

export default ({
  icon,
  attrs: _attrs,
  button,
  onClick = v => v,
  btnstyle,
  ...props
}) => {
  const theme = useTheme();
  const fill = theme.palette.text.secondary;
  const attrs = Object.assign({ fill }, _attrs);
  const query = Object.keys(attrs)
    .map(k => `${k}=${attrs[k]}`)
    .join("&");
  const Icon = (
    <img
      className="icon"
      src={process.env.PUBLIC_URL + `/svg/${icon}.svg?${query}`}
      {...props}
      onClick={onClick}
    />
  );

  if (!button) return Icon;
  return (
    <IconButton onClick={onClick} style={btnstyle}>
      {Icon}
    </IconButton>
  );
};
