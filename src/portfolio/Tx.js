import React from 'react'
import List, {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import DeleteIcon from 'material-ui-icons/Delete';
import moment from 'moment';

export default ({ tx: { coin, symbol, value, createdAt }, onRemove}) =>
<ListItem button>
  <ListItemText
    primary={symbol + ' ' + value}
    secondary={moment(createdAt * 1000).fromNow()}
  />
  {
    typeof onRemove === 'function' ?
    <ListItemSecondaryAction>
      <IconButton aria-label="Delete" onClick={onRemove}>
        <DeleteIcon />
      </IconButton>
    </ListItemSecondaryAction> :
    <div />
  }
</ListItem>
