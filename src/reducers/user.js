import {
  CREATE_SUCCESS,
  FETCH_AUTH_TOKEN_SUCCESS,
  JOIN_SUCCESS,
  SYNCHRONIZE_SUCCESS
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
    case SYNCHRONIZE_SUCCESS:
      return {
        ...state,
        spotifySynchronized: action.payload,
      };
    default:
      return state;
  }
}
