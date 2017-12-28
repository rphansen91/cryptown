import React from 'react';
import Typography from 'material-ui/Typography';

export default ({onClick, style }) =>
  <Typography type="title" onClick={onClick} style={style}>
    <img src={(process.env.PUBLIC_URL || '') + '/icon.png'} style={{height: '1em', marginRight: 4, borderRadius: '0.1em'}} /> Hodl Stream
  </Typography>
