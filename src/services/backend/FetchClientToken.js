import {API_BASE_URL, FETCH_ERROR, STATUS_FAILURE, STATUS_SUCCESS} from "./constants";

class FetchClientToken {
  constructor(user) {
    this._status = STATUS_SUCCESS;
    this._user = user;
    this._clientToken = null;
    this._error = null;
  }

  perform() {
    let clientTokenRequest = new Request(`${API_BASE_URL}/users/${this._user.username}/clientToken`,
      {
        headers: {
          "Authorization": this._user.secret,
          "Session": this._user.sessionID
        }
      });

    return fetch(clientTokenRequest)
      .then(res => {
        if (res.ok)
          return res.json()
            .then(data => this._clientToken = data.access_token)
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

  get status() {
    return this._status;
  }

  get clientToken() {
    return this._clientToken;
  }

  get error() {
    return this._error;
  }
}

export default FetchClientToken;
