import React from "react";
import { connect } from "react-redux";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { setPair } from "../store/reducers/pair";

const mapStateToProps = ({ pair: value }) => ({
  values: ["USD", /*'EUR',*/ "BTC"],
  value
});

const mapDispatchToProps = dispatch => ({
  onChange: val => dispatch(setPair(val))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(({ onChange, value, values = [], fullWidth, style = {} }) => (
  <Select
    classes={{
      root: "white-text",
      icon: "white-text"
    }}
    onChange={ev => onChange(ev.target.value)}
    value={value}
    fullWidth={fullWidth}
    style={style}
  >
    {values.map(value => (
      <MenuItem key={value} value={value}>
        {value}
      </MenuItem>
    ))}
  </Select>
));
