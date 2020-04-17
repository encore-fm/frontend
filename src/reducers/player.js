import {SET_PLAYER_STATE} from "../actions/player";

const initialState = {
  currentTrack: null,
  positionMs: null,
  paused: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYER_STATE:
      return {...state};
    default:
      return state;
  }
};
