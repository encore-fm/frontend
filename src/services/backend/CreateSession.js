import {API_BASE_URL, FETCH_ERROR, STATUS_FAILURE, STATUS_SUCCESS} from "./constants";

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
          return res.json()
            .then(data => this.parseData(data))
            .then(() => this);
        else {
          this._status = STATUS_FAILURE;
          return res.json()
            .then(err => this._error = err)
            .then(() => this);
        }
      }, err => {
        this._status = STATUS_FAILURE;
        this._error = FETCH_ERROR;
        return this;
      });
  }

  parseData(data) {
    this._user = {
      ...this.user,
      id: data.user_info.id,
      secret: data.user_info.secret,
      sessionID: data.user_info.session_id,
      isAdmin: data.user_info.is_admin,
      score: data.user_info.score,
      authUrl: data.auth_url
    };
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
