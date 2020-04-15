import {FETCH_PLAYLIST_SUCCESS} from "../actions/playlist";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_PLAYLIST_SUCCESS:
      return {...action.payload};
    default:
      return state;
  }
}
