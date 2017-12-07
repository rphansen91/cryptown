import React from 'react'
import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import DeleteIcon from 'material-ui-icons/Delete';
import CryptoIcon from '../icons/CryptoIcon';
import moment from 'moment';

export default ({ tx: { coin, value, createdAt }, onRemove}) =>
<ListItem button>
  <ListItemAvatar>
    <Avatar>
      <CryptoIcon className="full-size" icon={coin} attrs="height='100%'" />
    </Avatar>
  </ListItemAvatar>
  <ListItemText
    primary={coin + ' ' + value}
    secondary={moment(createdAt * 1000).fromNow()}
  />
  <ListItemSecondaryAction>
    <IconButton aria-label="Delete" onClick={onRemove}>
      <DeleteIcon />
    </IconButton>
  </ListItemSecondaryAction>
</ListItem>
