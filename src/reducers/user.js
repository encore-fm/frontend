import {CREATE_SUCCESS, FETCH_AUTH_TOKEN_SUCCESS, JOIN_SUCCESS} from "../actions/user";

const initialState = {
  username: null,
  secret: null,
  id: null,
  isAdmin: false,
  score: 0,
  authUrl: null,
  error: null
};

// sets the user in the store
export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SUCCESS:
    case JOIN_SUCCESS:
      return {...action.payload};
    case FETCH_AUTH_TOKEN_SUCCESS:
      return {
        ...state,
        authToken: action.payload
      };
    default:
      return state;
  }
}
