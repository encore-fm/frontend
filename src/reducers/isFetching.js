import {SET_FETCHING} from "../actions/isFetching";

export default (state = false, action) => {
  switch (action.type) {
    case SET_FETCHING:
      return true;
    default:
      return false;
  }
}
