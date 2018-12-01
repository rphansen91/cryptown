import { connect } from "react-redux";

export const SET_PROFILE = "SET_PROFILE";

export const setProfile = payload => ({
  type: SET_PROFILE,
  payload
});

export const withProfile = connect(
  ({ profile }) => ({ profile }),
  { setProfile }
);

export default (state = { theme: "dark" }, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return action.payload;
    default:
      return state;
  }
};
