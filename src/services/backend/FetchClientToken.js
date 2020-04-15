import {API_BASE_URL, STATUS_FAILURE, STATUS_SUCCESS} from "./constants";

class FetchClientToken {
  constructor(user) {
    this._status = STATUS_SUCCESS;
    this._user = user;
    this._clientToken = null;
    this._error = null;
  }

  perform() {
    let clientTokenRequest = new Request(`${API_BASE_URL}/users/${this.user.username}/clientToken`,
      {
        headers: {
          "Authorization": this.user.secret,
          "Session": this.user.sessionID
        }
      });

    return fetch(clientTokenRequest)
      .then(res => {
        if (res.ok)
          res.json().then(data => this._clientToken = data.access_token);
        else {
          this._status = STATUS_FAILURE;
          res.json().then(err => this._error = err);
        }
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
