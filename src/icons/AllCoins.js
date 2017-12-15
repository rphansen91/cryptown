import React from 'react';
import CryptoIcon from './CryptoIcon';
import icons from './icons';
import { defaultColor } from '../utility/styles';

const mainCoins = icons.main()
export default () => <div className="icons">
  { mainCoins.map(icon => <CryptoIcon style={{margin: 6}} key={icon} attrs={(`fill="${defaultColor}" height="4em"`)} icon={icon} />) }
</div>
