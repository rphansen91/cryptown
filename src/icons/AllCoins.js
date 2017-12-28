import React from 'react';
import CryptoIcon from './CryptoIcon';
import icons from './icons';
import { defaultColor } from '../utility/styles';
import { withTheme } from 'material-ui/styles';

const mainCoins = icons.main()
export default withTheme()(({ onClick, theme: { palette: { action: { active: color } } } }) =>
  <div className="icons">
    { mainCoins.map(icon => <CryptoIcon
      button="true"
      onClick={() => onClick(icon)}
      key={icon}
      style={{margin: 6}}
      attrs={(`fill="${'#fff' || color}" height="100%" width="100%"`)}
      icon={icon} />) }
  </div>)
