import React from "react";
import PropTypes from "prop-types";
import { withTheme } from "material-ui/styles";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import "./index.css";

function SimpleMediaCard(props) {
  const {
    onClick,
    image,
    title,
    actions,
    large = true,
    theme,
    imageSize = "6em"
  } = props;
  const color = theme.palette.text.secondary;
  return (
    <Card
      className="article"
      style={{
        color,
        cursor: "pointer"
      }}
      onClick={onClick || (v => v)}
    >
      <CardMedia
        style={{ height: imageSize, width: large ? "inherit" : imageSize }}
        image={image}
        title={title}
      />
      <div style={large ? {} : { flex: 1 }}>
        <CardContent
          style={{
            maxHeight: "3em",
            minHeight: "3em",
            whiteSpace: "normal",
            overflow: "hidden",
            padding: "0 0.4em",
            lineHeight: "1em",
            textAlign: "left"
          }}
        >
          <Typography type="title" component="p">
            {title}
          </Typography>
        </CardContent>
        {actions}
      </div>
    </Card>
  );
}

export default withTheme()(SimpleMediaCard);
