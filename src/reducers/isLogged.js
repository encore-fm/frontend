import {CREATE_SUCCESS, JOIN_SUCCESS} from "../actions/user";

export default (state = false, action) => {
  switch (action.type) {
    case CREATE_SUCCESS:
    case JOIN_SUCCESS:
      return true;
    default:
      return state;
  }
}
