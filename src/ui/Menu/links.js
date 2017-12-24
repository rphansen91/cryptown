import React from 'react';
import List, { ListItemIcon, ListItemText } from 'material-ui/List';
import HomeIcon from 'material-ui-icons/Home';
import DraftsIcon from 'material-ui-icons/Drafts';
import AddIcon from 'material-ui-icons/Add';
import GQLIcon from 'material-ui-icons/NetworkCheck';
import HelpIcon from 'material-ui-icons/Help';
import SendIcon from 'material-ui-icons/Send';
import CoinLink from './CoinLink';
import RegItem from './Item';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export const MainListItems = withRouter((props) =>
<List className={props.className || ""}>
  <RegItem onClick={() => props.history.push((process.env.PUBLIC_URL || '') + '/')}>
    <ListItemIcon>
      <HomeIcon />
    </ListItemIcon>
    <ListItemText primary="Home" />
  </RegItem>
  <RegItem onClick={() => props.history.push((process.env.PUBLIC_URL || '') + '/tx')}>
    <ListItemIcon>
      <SendIcon />
    </ListItemIcon>
    <ListItemText primary="Trades" />
  </RegItem>
  <RegItem onClick={() => props.history.push((process.env.PUBLIC_URL || '') + '/add')}>
    <ListItemIcon>
      <AddIcon />
    </ListItemIcon>
    <ListItemText primary="Add" />
  </RegItem>
</List>)

export const OtherListItems = withRouter((props) =>
<List className={props.className || ""}>
  <RegItem onClick={() => props.history.push((process.env.PUBLIC_URL || '') + '/about')}>
    <ListItemIcon>
      <HelpIcon />
    </ListItemIcon>
    <ListItemText primary="About" />
  </RegItem>
  {
    process.env.NODE_ENV !== 'production' ?
    <RegItem onClick={() => props.history.push((process.env.PUBLIC_URL || '') + '/gql')}>
      <ListItemIcon>
        <GQLIcon />
      </ListItemIcon>
      <ListItemText primary="GraphQL" />
    </RegItem> :
    <div />
  }
</List>)


export const CoinListItems = connect(
  ({ coins, menu: open }) => {
    console.log(coins)
    return ({ open, coins })
  },
  dispatch => ({})
)(withRouter((props) =>
<List className={props.className || ""}>
  {
    (props.coins || []).map((coin, i) => <CoinLink key={i} id={coin.id} {...props} />)
  }
</List>))
