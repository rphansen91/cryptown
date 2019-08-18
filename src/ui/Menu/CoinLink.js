import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import coinQl from "../../gql/coin";
import CryptoIcon from "../../icons/CryptoIcon";
import Percent from "../../explorer/Percent";

const defaultCoin = name => ({ symbol: "", percent_change_24h: 0 });
const attrs = c => ({
  fill: c
});
const iconStyle = {
  height: 24,
  width: 24
};
const style = { height: 24, width: 24, marginRight: 16, fontSize: 10 };

export default coinQl(
  ({ open, id, history, data: { loading, error, coin = defaultCoin } }) => {
    return (
      <Link aria-label={coin.symbol} to={"/coin/" + id}>
        <ListItem>
          <ListItemIcon>
            <CryptoIcon icon={coin.symbol} style={iconStyle} />
          </ListItemIcon>
          <ListItemText style={{ opacity: open ? 1 : 0 }}>
            <Typography color="textPrimary">{coin.symbol}</Typography>
          </ListItemText>
          <Percent value={coin.percent_change_24h} />
        </ListItem>
      </Link>
    );
  }
);
