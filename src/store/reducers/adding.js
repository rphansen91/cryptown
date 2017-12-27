export const SET_ADDING = 'SET_ADDING'

export const setAdding = payload => ({
  type: SET_ADDING,
  payload
})

const adding = (state = {}, action) => {
  switch (action.type) {
    case SET_ADDING:
      return action.payload
    default:
      return state
  }
}

export default adding
