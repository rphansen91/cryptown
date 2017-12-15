import React from 'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import HomeIcon from 'material-ui-icons/Home';
import DraftsIcon from 'material-ui-icons/Drafts';
import AddIcon from 'material-ui-icons/Add';
import GQLIcon from 'material-ui-icons/NetworkCheck';
import HelpIcon from 'material-ui-icons/Help';
import { Link, withRouter } from 'react-router-dom';

const RegLink = props => <Link {...props} style={{textDecoration: 'none'}} />
const RegItem = ({ children, onClick }) =>
  <ListItem button onClick={onClick}>
    { children }
  </ListItem>

export const MainListItems = withRouter((props) =>
<List style={props.style || {}}>
  <RegItem onClick={() => props.history.push('/')}>
    <ListItemIcon>
      <HomeIcon />
    </ListItemIcon>
    <ListItemText primary="Home" />
  </RegItem>
  <RegItem onClick={() => props.history.push('/tx')}>
    <ListItemIcon>
      <DraftsIcon />
    </ListItemIcon>
    <ListItemText primary="Trades" />
  </RegItem>
  <RegItem onClick={() => props.history.push('/add')}>
    <ListItemIcon>
      <AddIcon />
    </ListItemIcon>
    <ListItemText primary="Add" />
  </RegItem>
</List>)

export const OtherListItems = withRouter((props) =>
<List style={props.style || {}}>
  <RegItem onClick={() => props.history.push('/about')}>
    <ListItemIcon>
      <HelpIcon />
    </ListItemIcon>
    <ListItemText primary="About" />
  </RegItem>
  <RegItem onClick={() => props.history.push('/gql')}>
    <ListItemIcon>
      <GQLIcon />
    </ListItemIcon>
    <ListItemText primary="GraphQL" />
  </RegItem>
</List>)
