import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

function SimpleMediaCard(props) {
  const { onClick, image, title, actions } = props;
  return (
    <Card style={{
      display: 'inline-block',
      maxWidth: 345,
      margin: 4,
      cursor: 'pointer'
    }} onClick={onClick || (v => v)}>
      <CardMedia
        style={{ height: 200 }}
        image={image}
        title={title}
      />
      <CardContent style={{
        maxHeight: "3em",
        minHeight: "3em",
        whiteSpace: "normal",
        overflow: "hidden",
        padding: "0 0.4em",
        lineHeight: "1em"
      }}>
        <Typography type="title" component="p">
          { title }
        </Typography>
      </CardContent>
      { actions }
    </Card>
  );
}

export default SimpleMediaCard;
