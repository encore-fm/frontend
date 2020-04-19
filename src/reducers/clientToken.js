import {SET_CLIENT_TOKEN} from "../actions/clientToken";

export default (state = null, action) => {
  switch (action.type) {
    case SET_CLIENT_TOKEN:
      return action.payload;
    default:
      return state;
  }
};
