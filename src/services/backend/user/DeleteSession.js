import {API_BASE_URL, STATUS_SUCCESS} from "../constants";
import fetchWithoutData from "../helpers/fetchWithoutData";

class DeleteSession {
  constructor(user) {
    // request status constant
    this._status = STATUS_SUCCESS;
    this._user = user;
    this._error = null;
  }

  // joins a session and returns the user object
  perform() {
    const deleteSessionRequest = new Request(`${API_BASE_URL}/admin/${this.user.username}/deleteSession`,
      {method: 'DELETE'});

    return fetchWithoutData(deleteSessionRequest, this);
  }

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
  }

  get user() {
    return this._user;
  }

  get error() {
    return this._error;
  }

  set error(value) {
    this._error = value;
  }
}

export default DeleteSession;
