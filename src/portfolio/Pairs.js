import React from 'react';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

export default ({ onChange, value, values=[], fullWidth }) =>
  <Select
  classes={{
    root: "white-text",
    icon: "white-text"
  }}
  onChange={(ev) => onChange(ev.target.value)}
  value={value}
  fullWidth={fullWidth}>
  { values.map(value =>
    <MenuItem key={value} value={value}>
      { value }
    </MenuItem>) }
  </Select>
