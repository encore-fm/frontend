import {SET_PLAYER_STATE} from "../actions/player";

export default (state = null, action) => {
  switch (action.type) {
    case SET_PLAYER_STATE:
      return {...action.payload};
    default:
      return state;
  }
};
