import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";

export default ({ tx: { coin, symbol, value, createdAt }, onRemove }) => (
  <ListItem button>
    <ListItemText
      primary={symbol + " " + value}
      secondary={moment(createdAt * 1000).fromNow()}
    />
    {typeof onRemove === "function" ? (
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete" onClick={onRemove}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    ) : (
      <div />
    )}
  </ListItem>
);
