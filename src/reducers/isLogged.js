import {
  AUTH_FAILURE,
  CREATE_SUCCESS,
  DELETE_SESSION_SUCCESS,
  JOIN_SUCCESS,
  LEAVE_SUCCESS,
  LOG_OUT
} from "../actions/user";
import {REQUEST_NOT_AUTHORIZED_ERROR} from "../services/backend/constants";

export default (state = false, action) => {
  // set isLogged to false if backend ever returns a request not authorized error
  if (action.error && action.error.error === REQUEST_NOT_AUTHORIZED_ERROR)
    return false;

  switch (action.type) {
    case CREATE_SUCCESS:
    case JOIN_SUCCESS:
      return true;
    case LEAVE_SUCCESS:
    case DELETE_SESSION_SUCCESS:
    case LOG_OUT:
      return false;
    default:
      return state;
  }
}
