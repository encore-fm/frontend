import {FETCH_CLIENT_TOKEN_SUCCESS} from "../actions/clientToken";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_CLIENT_TOKEN_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
