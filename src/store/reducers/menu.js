export const SET_MENU_OPEN = 'SET_MENU_OPEN'
export const SET_MENU_CLOSED = 'SET_MENU_CLOSED'
export const TOGGLE_MENU = 'TOGGLE_MENU'

export const openMenu = () => ({ type: SET_MENU_OPEN })
export const closeMenu = () => ({ type: SET_MENU_CLOSED })
export const toggleMenu = () => ({ type: TOGGLE_MENU })

const menu = (state = false, action) => {
  switch (action.type) {
    case SET_MENU_OPEN:
      return true
    case SET_MENU_CLOSED:
      return false
    case TOGGLE_MENU:
      return !state
    default:
      return state
  }
}

export default menu
