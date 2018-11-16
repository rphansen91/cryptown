import { createAction, createReducer } from "redux-delta";
import defaultSvg from "../../icons/defaultIcon";

export const cacheSvg = createAction("CACHE_SVG")

export const loadSvg = (url) => (dispatch, getState) => {
  const { svgs } = getState();

  if (svgs[url]) return svgs[url]

  fetch(url)
  .then(res => res.text())
  .then(svg => {
    if (!svg) throw new Error("Not found");
    return svg
  })
  .then(svg => {
    dispatch(cacheSvg({ url, svg }))
  })
  .catch((e) => {
    dispatch(cacheSvg({ url, svg: defaultSvg }))
  });
}

export default createReducer({}, [
  cacheSvg.case(
    (_, { url, svg }) => ({ [url]: svg })
  )
])