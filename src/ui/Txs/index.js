import React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Tx from "../../portfolio/Tx";
import txStore from "../../portfolio/txs";
import { setTxs } from "../../store/reducers/transactions";
import { TopBannerDisplayAd, BottomBannerDisplayAd } from "../../ads/slots";
import remove from "../../utility/remove";
import SEO from "../SEO";
import "./style.css";

const Txs = ({ txs, onChange = v => v }) => (
  <div>
    <SEO title={"Transactions | Hodl Stream"} path={"/tx"} />
    <TopBannerDisplayAd />
    <section />
    <section>
      <div className="contained">
        <Typography variant="h1" color="textPrimary">
          Transactions
        </Typography>
        <List className="text-initial">
          {txs
            .filter(({ value }) => value)
            .map((tx, i) => (
              <Tx key={i} tx={tx} onRemove={() => onChange(remove(txs, i))} />
            ))}
        </List>
      </div>
    </section>
    <BottomBannerDisplayAd />
  </div>
);

const store = txStore();
export default connect(
  ({ txs }) => ({ txs }),
  dispatch => ({
    onChange: txs => {
      store.save(txs).then(txs => dispatch(setTxs(txs)));
    }
  })
)(Txs);
