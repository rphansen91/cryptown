export const SET_PAIR = 'SET_PAIR'

export const setPair = payload => ({
  type: SET_PAIR,
  payload
})

const pair = (state = 'USD', action) => {
  switch (action.type) {
    case SET_PAIR:
      return action.payload
    default:
      return state
  }
}

export default pair
