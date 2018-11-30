import React from "react";
import List, { ListItemIcon, ListItemText } from "material-ui/List";
import HomeIcon from "material-ui-icons/Home";
import SettingsIcon from "material-ui-icons/Settings";
import DraftsIcon from "material-ui-icons/Drafts";
import AddIcon from "material-ui-icons/Add";
import NoteIcon from "material-ui-icons/Note";
import GQLIcon from "material-ui-icons/NetworkCheck";
import HelpIcon from "material-ui-icons/Help";
import SendIcon from "material-ui-icons/Send";
import CoinLink from "./CoinLink";
import RegItem from "./Item";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { withTheme } from "material-ui/styles";

const linkStyle = color => ({
  flex: "1 1 auto",
  padding: "0 16px",
  color
});

export const MainListItems = compose(
  withTheme(),
  withRouter
)(props => (
  <List className={props.className || ""}>
    <RegItem onClick={() => props.history.push("/")}>
      <Link to="/">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
      </Link>
      <Link to="/" style={linkStyle(props.theme.palette.text.secondary)}>
        Home
      </Link>
    </RegItem>
    <RegItem onClick={() => props.history.push("/tx")}>
      <Link to="/tx">
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
      </Link>
      <Link to="/tx" style={linkStyle(props.theme.palette.text.secondary)}>
        Trades
      </Link>
    </RegItem>
    <RegItem onClick={() => props.history.push("/add")}>
      <Link to="/add">
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
      </Link>
      <Link to="/add" style={linkStyle(props.theme.palette.text.secondary)}>
        Add
      </Link>
    </RegItem>
    <RegItem onClick={() => props.history.push("/blog")}>
      <Link to="/blog">
        <ListItemIcon>
          <NoteIcon />
        </ListItemIcon>
      </Link>
      <Link to="/blog" style={linkStyle(props.theme.palette.text.secondary)}>
        Blog
      </Link>
    </RegItem>
  </List>
));

export const OtherListItems = compose(
  withTheme(),
  withRouter
)(props => (
  <List className={props.className || ""}>
    <RegItem onClick={() => props.history.push("/about")}>
      <Link to="/about">
        <ListItemIcon>
          <HelpIcon />
        </ListItemIcon>
      </Link>
      <Link to="/about" style={linkStyle(props.theme.palette.text.secondary)}>
        About
      </Link>
    </RegItem>
    <RegItem onClick={() => props.history.push("/settings")}>
      <Link to="/settings">
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
      </Link>
      <Link
        to="/settings"
        style={linkStyle(props.theme.palette.text.secondary)}
      >
        Settings
      </Link>
    </RegItem>
    {process.env.NODE_ENV !== "production" ? (
      <RegItem onClick={() => props.history.push("/gql")}>
        <Link to="/gql">
          <ListItemIcon>
            <GQLIcon />
          </ListItemIcon>
        </Link>
        <Link to="/gql" style={linkStyle(props.theme.palette.text.secondary)}>
          GraphQL
        </Link>
      </RegItem>
    ) : (
      <div />
    )}
  </List>
));

export const CoinListItems = connect(
  ({ coins, menu: open }) => ({ open, coins }),
  dispatch => ({})
)(
  withRouter(props => (
    <List className={props.className || ""}>
      {(props.coins || []).map((coin, i) => (
        <CoinLink key={i} id={coin.id} {...props} />
      ))}
    </List>
  ))
);
