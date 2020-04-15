import {API_BASE_URL, STATUS_FAILURE, STATUS_SUCCESS} from "./constants";

class CreateSession {
  constructor(adminName) {
    // request status constant
    this._status = STATUS_SUCCESS;
    this._user = {
      username: adminName,
    };
    this._error = null;
  }

  // creates a session and returns the current instance
  perform() {
    let createRequest = new Request(`${API_BASE_URL}/admin/${this.user.username}/createSession`,
      {method: 'POST'});

    return fetch(createRequest)
      .then(res => {
        if (res.ok)
          res.json().then(data => this.parseData(data));
        else {
          this._status = STATUS_FAILURE;
          res.json().then(err => this._error = err);
        }
        return this;
      });
  }

  parseData(data) {
    this.user.id = data.user_info.id;
    this.user.secret = data.user_info.secret;
    this.user.sessionID = data.user_info.session_id;
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

export default CreateSession;
