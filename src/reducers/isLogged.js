import {AUTH_FAILURE, CREATE_SUCCESS, JOIN_SUCCESS} from "../actions/user";
import {REQUEST_NOT_AUTHORIZED_ERROR} from "../services/backend/constants";

export default (state = false, action) => {
  switch (action.type) {
    case CREATE_SUCCESS:
    case JOIN_SUCCESS:
      return true;
    case AUTH_FAILURE:
      // set isLogged to false if backend can't find username/session/secret
      return action.error.error !== REQUEST_NOT_AUTHORIZED_ERROR;
    default:
      return state;
  }
}
