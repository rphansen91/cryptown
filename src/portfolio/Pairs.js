import React from 'react';
import { connect } from 'react-redux'
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { setPair } from '../store/reducers/pair';

const mapStateToProps = ({ pair: value }) => ({
  values: ['USD', /*'EUR',*/ 'BTC'],
  value
})

const mapDispatchToProps = dispatch => ({
  onChange: (val) => dispatch(setPair(val))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(({ onChange, value, values=[], fullWidth }) =>
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
  </Select>)
