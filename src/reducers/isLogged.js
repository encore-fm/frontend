import {AUTH_FAILURE, CREATE_SUCCESS, DELETE_SESSION_SUCCESS, JOIN_SUCCESS, LEAVE_SUCCESS} from "../actions/user";
import {REQUEST_NOT_AUTHORIZED_ERROR} from "../services/backend/constants";

export default (state = false, action) => {
  switch (action.type) {
    case CREATE_SUCCESS:
    case JOIN_SUCCESS:
      return true;
    case AUTH_FAILURE:
      // set isLogged to false if backend can't find username/session/secret
      return action.error.error !== REQUEST_NOT_AUTHORIZED_ERROR;
    case LEAVE_SUCCESS:
    case DELETE_SESSION_SUCCESS:
      return false;
    default:
      return state;
  }
}
