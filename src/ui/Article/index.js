import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./index.css";

function SimpleMediaCard(props) {
  const {
    onClick,
    image,
    title,
    actions,
    imageStyle,
    large = true,
    isActive = false,
    imageSize = "6em",
    ...style
  } = props;
  const theme = useTheme();
  const color = isActive
    ? theme.palette.primary.main
    : theme.palette.text.secondary;
  return (
    <Card
      className="article"
      style={{
        color,
        cursor: "pointer",
        ...style
      }}
      onClick={onClick || (v => v)}
    >
      {image && (
        <CardMedia
          style={{
            height: imageSize,
            width: large ? "inherit" : imageSize,
            ...imageStyle
          }}
          image={image}
          title={title}
        />
      )}
      <div style={large ? {} : { flex: 1 }}>
        <CardContent
          style={{
            maxHeight: "3.6em",
            minHeight: "3.6em",
            whiteSpace: "normal",
            overflow: "hidden",
            padding: "0.4em",
            paddingBottom: 0,
            lineHeight: "1em",
            textAlign: "left"
          }}
        >
          <Typography variant="subtitle1" color="textPrimary" component="p">
            {title}
          </Typography>
        </CardContent>
        {actions}
      </div>
    </Card>
  );
}

export default SimpleMediaCard;
