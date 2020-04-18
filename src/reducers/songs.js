import {SET_SONGS} from "../actions/songs";

export default (state = [], action) => {
  switch (action.type) {
    case SET_SONGS:
      return [...action.payload];
    default:
      return state;
  }
}
