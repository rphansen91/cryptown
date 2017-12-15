import React from 'react';
import CryptoIcon from './CryptoIcon';
import icons from './icons';
import { defaultColor } from '../utility/styles';

const mainCoins = icons.main()
export default ({ onClick }) => <div className="icons">
  { mainCoins.map(icon => <CryptoIcon
    button="true"
    onClick={() => onClick(icon)}
    key={icon}
    style={{margin: 6}}
    attrs={(`fill="${defaultColor}" height="100%" width="100%"`)}
    icon={icon} />) }
</div>
