import {SET_MENU_CLOSED, SET_MENU_OPEN} from "../actions/menu";

export default (state = false, action) => {
  switch (action.type) {
    case SET_MENU_OPEN:
      return true;
    case SET_MENU_CLOSED:
      return false;
    default:
      return state;
  }
}
