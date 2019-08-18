import React from "react";
import ListItem from "@material-ui/core/ListItem";

export default ({ children, onClick }) => (
  <ListItem button onClick={onClick}>
    {children}
  </ListItem>
);
