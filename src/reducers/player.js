import {SET_PLAYER_STATE} from "../actions/player";

const initialState = {
  currentSong: null,
  isPlaying: false,
  progress: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYER_STATE:
      return {...action.payload};
    default:
      return state;
  }
};
