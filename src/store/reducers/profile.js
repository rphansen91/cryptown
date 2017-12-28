export const SET_PROFILE = 'SET_PROFILE'

export const setProfile = payload => ({
  type: SET_PROFILE,
  payload
})

const profile = (state = { theme: 'dark' }, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return action.payload
    default:
      return state
  }
}

export default profile
