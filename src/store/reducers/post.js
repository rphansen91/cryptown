import { connect } from "react-redux";
import { createReducer, createAction } from "redux-delta";

export const setPost = createAction("SET_POST");

export const post = createReducer({}, [setPost.case((_, data) => ({ data }))]);

export const withPost = connect(
  ({ post }) => ({ post }),
  { setPost }
);
