import { createReducer, createAction } from "redux-delta"

export const setPost = createAction("SET_POST");

export const post = createReducer({}, [
    setPost.case((_, data) => ({ data }))
])