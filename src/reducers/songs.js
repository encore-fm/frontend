import {FETCH_SONGS_SUCCESS} from "../actions/songs";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_SONGS_SUCCESS:
      return {...action.payload};
    default:
      return state;
  }
}
