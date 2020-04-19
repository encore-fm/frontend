import {FETCH_SESSION_INFO_SUCCESS} from "../actions/sessionInfo";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_SESSION_INFO_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
