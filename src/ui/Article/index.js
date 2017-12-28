import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
    display: 'inline-block',
    maxWidth: 345,
    margin: 4,
    cursor: 'pointer'
  },
  media: {
    height: 200,
  },
  content: {
    maxHeight: "4em",
    minHeight: "4em",
    whiteSpace: "normal",
    overflow: "hidden",
    padding: "0.4em",
    lineHeight: "1em"
  }
};

function SimpleMediaCard(props) {
  const { classes, onClick, image, title, actions } = props;
  return (
    <Card className={classes.card} onClick={onClick || (v => v)}>
      <CardMedia
        className={classes.media}
        image={image}
        title={title}
      />
      <CardContent className={classes.content}>
        <Typography type="title" component="p">
          { title }
        </Typography>
      </CardContent>
      { actions }
    </Card>
  );
}

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMediaCard);
