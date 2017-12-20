import React from 'react';
import { ListItem } from 'material-ui/List';

export default ({ children, onClick }) =>
  <ListItem button onClick={onClick}>
    { children }
  </ListItem>
