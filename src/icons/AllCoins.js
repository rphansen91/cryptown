import React from 'react';
import CryptoIcon from './CryptoIcon';
import icons from './icons';
import { defaultColor } from '../utility/styles';

const mainCoins = icons.main()
export default ({ onClick, color=defaultColor }) => <div className="icons">
  { mainCoins.map(icon => <CryptoIcon
    button="true"
    onClick={() => onClick(icon)}
    key={icon}
    style={{margin: 6}}
    attrs={(`fill="${color}" height="100%" width="100%"`)}
    icon={icon} />) }
</div>
