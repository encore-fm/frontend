import {
  CREATE_SUCCESS,
  FETCH_AUTH_TOKEN_SUCCESS,
  JOIN_SUCCESS,
  REQUEST_DESYNCHRONIZE,
  REQUEST_SYNCHRONIZE
} from "../actions/user";

// sets the user in the store
export default (state = null, action) => {
  switch (action.type) {
    case CREATE_SUCCESS:
    case JOIN_SUCCESS:
      return {...action.payload};
    case FETCH_AUTH_TOKEN_SUCCESS:
      return {
        ...state,
        authToken: action.payload
      };
    case REQUEST_SYNCHRONIZE:
      return {
        ...state,
        spotifySynchronized: true,
      };
    case REQUEST_DESYNCHRONIZE:
      return {
        ...state,
        spotifySynchronized: false,
      };
    default:
      return state;
  }
}
