import { sorter } from "../../portfolio/compute";
import { connect } from "react-redux";

export const SET_TXS = "SET_TRANSACTIONS";

export const setTxs = payload => ({
  type: SET_TXS,
  payload
});

export const withTxs = connect(
  ({ txs }) => ({ txs }),
  { setTxs }
);

export default (state = [], action) => {
  switch (action.type) {
    case SET_TXS:
      return [].concat(action.payload).sort(sorter("createdAt", -1));
    default:
      return state;
  }
};
