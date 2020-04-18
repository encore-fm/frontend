import {SET_PLAYLIST} from "../actions/playlist";

export default (state = [], action) => {
  switch (action.type) {
    case SET_PLAYLIST:
      return [...action.payload];
    default:
      return state;
  }
}
