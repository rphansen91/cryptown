import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";
import DraftsIcon from "@material-ui/icons/Drafts";
import AddIcon from "@material-ui/icons/Add";
import NoteIcon from "@material-ui/icons/Note";
import GQLIcon from "@material-ui/icons/NetworkCheck";
import HelpIcon from "@material-ui/icons/Help";
import SendIcon from "@material-ui/icons/Send";
import CoinLink from "./CoinLink";
import RegItem from "./Item";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

const linkStyle = color => ({
  flex: "1 1 auto",
  padding: "0 16px",
  color
});

export const MainListItems = withRouter(props => (
  <List className={props.className || ""}>
    <Link to="/" aria-label="home">
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography color="textPrimary">Home</Typography>
        </ListItemText>
      </ListItem>
    </Link>
    <Link to="/tx" aria-label="tx">
      <ListItem button>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography color="textPrimary">Trades</Typography>
        </ListItemText>
      </ListItem>
    </Link>
    <Link to="/add" aria-label="add">
      <ListItem button>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography color="textPrimary">Add</Typography>
        </ListItemText>
      </ListItem>
    </Link>
    <Link to="/blog" aria-label="blog">
      <ListItem button>
        <ListItemIcon>
          <NoteIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography color="textPrimary">Blog</Typography>
        </ListItemText>
      </ListItem>
    </Link>
  </List>
));

export const OtherListItems = withRouter(props => (
  <List className={props.className || ""}>
    <Link to="/about" aria-label="about">
      <ListItem button>
        <ListItemIcon>
          <HelpIcon />
        </ListItemIcon>

        <ListItemText>
          <Typography color="textPrimary">About</Typography>
        </ListItemText>
      </ListItem>
    </Link>
    <Link to="/settings" aria-label="settings">
      <ListItem button>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography color="textPrimary">Settings</Typography>
        </ListItemText>
      </ListItem>
    </Link>
    {process.env.NODE_ENV !== "production" ? (
      <Link to="/gql" aria-label="gql">
        <ListItem button>
          <ListItemIcon>
            <GQLIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography color="textPrimary">GraphQL</Typography>
          </ListItemText>
        </ListItem>
      </Link>
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
