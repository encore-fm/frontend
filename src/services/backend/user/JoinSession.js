import {API_BASE_URL, STATUS_SUCCESS} from "../constants";
import fetchWithData from "../helpers/fetchWithData";
import {parseInitialUserData} from "../helpers/parseUser";

class JoinSession {
  constructor(username, sessionID) {
    // request status constant
    this._status = STATUS_SUCCESS;
    this._user = {
      username: username,
      sessionID: sessionID,
    };
    this._error = null;
  }

  // joins a session and returns the user object
  perform() {
    let joinRequest = new Request(`${API_BASE_URL}/users/${this.user.username}/join/${this.user.sessionID}`,
      {method: 'POST'});

    return fetchWithData(joinRequest, this, this.parseData);
  }

  parseData = data => {
    this._user = parseInitialUserData(this._user, data)
  };


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

export default JoinSession;
