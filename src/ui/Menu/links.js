import React from 'react';
import List, { ListItemIcon, ListItemText } from 'material-ui/List';
import HomeIcon from 'material-ui-icons/Home';
import SettingsIcon from 'material-ui-icons/Settings';
import DraftsIcon from 'material-ui-icons/Drafts';
import AddIcon from 'material-ui-icons/Add';
import GQLIcon from 'material-ui-icons/NetworkCheck';
import HelpIcon from 'material-ui-icons/Help';
import SendIcon from 'material-ui-icons/Send';
import CoinLink from './CoinLink';
import RegItem from './Item';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

const linkStyle = {
  flex: "1 1 auto",
  padding: "0 16px",
  color: "white"
}

export const MainListItems = withRouter((props) =>
<List className={props.className || ""}>
  <RegItem onClick={() => props.history.push((process.env.PUBLIC_URL || '') + '/')}>
    <Link to="/">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
    </Link>
    <Link to="/" style={linkStyle}>Home</Link>
  </RegItem>
  <RegItem onClick={() => props.history.push((process.env.PUBLIC_URL || '') + '/tx')}>
    <Link to="/tx">
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
    </Link>
    <Link to="/tx" style={linkStyle}>Trades</Link>
  </RegItem>
  <RegItem onClick={() => props.history.push((process.env.PUBLIC_URL || '') + '/add')}>
    <Link to="/add">
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
    </Link>
    <Link to="/add" style={linkStyle}>Add</Link>
  </RegItem>
</List>)

export const OtherListItems = withRouter((props) =>
<List className={props.className || ""}>
  <RegItem  onClick={() => props.history.push((process.env.PUBLIC_URL || '') + '/about')}>
    <Link to="/about">
      <ListItemIcon>
        <HelpIcon />
      </ListItemIcon>
    </Link>
    <Link to="/about" style={linkStyle}>About</Link>
  </RegItem>
  <RegItem  onClick={() => props.history.push((process.env.PUBLIC_URL || '') + '/settings')}>
    <Link to="/settings">
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
    </Link>
    <Link to="/settings" style={linkStyle}>Settings</Link>
  </RegItem>
  {
    process.env.NODE_ENV !== 'production' ?
    <RegItem  onClick={() => props.history.push((process.env.PUBLIC_URL || '') + '/gql')}>
      <Link to="/gql">
        <ListItemIcon>
          <GQLIcon />
        </ListItemIcon>
      </Link>
      <Link to="/gql" style={linkStyle}>GraphQL</Link>
    </RegItem> :
    <div />
  }
</List>)


export const CoinListItems = connect(
  ({ coins, menu: open }) => ({ open, coins }),
  dispatch => ({})
)(withRouter((props) =>
<List className={props.className || ""}>
  {
    (props.coins || []).map((coin, i) => <CoinLink key={i} id={coin.id} {...props} />)
  }
</List>))
