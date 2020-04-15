import {API_BASE_URL, STATUS_FAILURE, STATUS_SUCCESS} from "./constants";

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

    return fetch(joinRequest)
      .then(res => {
        if (res.ok)
          return res.json()
            .then(data => this.parseData(data))
            .then(() => this);
        else {
          this._status = STATUS_FAILURE;
          return res.json()
            .then(err => this._error = err)
            .then(() => this);
        }
      });
  }

  parseData(data) {
    this.user.id = data.user_info.id;
    this.user.secret = data.user_info.secret;
    this.user.isAdmin = data.user_info.is_admin;
    this.user.score = data.user_info.score;
    this.user.authUrl = data.auth_url;
  }


  get status() {
    return this._status;
  }

  get user() {
    return this._user;
  }

  get error() {
    return this._error;
  }
}

export default JoinSession;
