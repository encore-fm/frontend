import {SET_USER_LIST} from "../actions/userList";


export default (state = [], action) => {
  switch (action.type) {
    case SET_USER_LIST:
      return [...action.payload];
    default:
      return state;
  }
}
