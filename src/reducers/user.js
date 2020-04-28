import {
  CREATE_SUCCESS, DELETE_SESSION_SUCCESS,
  FETCH_AUTH_TOKEN_SUCCESS,
  JOIN_SUCCESS, LEAVE_SUCCESS, LOG_OUT, SET_USER,
  SET_SYNCHRONIZED
} from "../actions/user";

// sets the user in the store
export default (state = null, action) => {
  switch (action.type) {
    case CREATE_SUCCESS:
    case JOIN_SUCCESS:
    case SET_USER:
      return {...action.payload};
    case FETCH_AUTH_TOKEN_SUCCESS:
      return {
        ...state,
        authToken: action.payload
      };
    case SET_SYNCHRONIZED:
      return {
        ...state,
        // synchronized implies spotify authorized
        spotifyAuthorized: action.payload === true ? true : state.spotifyAuthorized,
        spotifySynchronized: action.payload,
      };
    case LEAVE_SUCCESS:
    case DELETE_SESSION_SUCCESS:
    case LOG_OUT:
      return null;
    default:
      return state;
  }
}
