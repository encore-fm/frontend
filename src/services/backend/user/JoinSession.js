import {API_BASE_URL, STATUS_SUCCESS} from "../constants";
import fetchWithData from "../helpers/fetchWithData";

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
    this._user = {
      ...this.user,
      id: data.user_info.id,
      secret: data.user_info.secret,
      isAdmin: data.user_info.is_admin,
      score: data.user_info.score,
      authUrl: data.auth_url
    };
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
