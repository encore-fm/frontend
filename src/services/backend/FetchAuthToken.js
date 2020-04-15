import {API_BASE_URL, STATUS_FAILURE, STATUS_SUCCESS} from "./constants";

class FetchAuthToken {
  constructor(user) {
    this._status = STATUS_SUCCESS;
    this._user = user;
    this._error = null;
  }

  // fetches the user's auth token, updates it and returns the user
  perform() {
    let clientTokenRequest = new Request(`${API_BASE_URL}/users/${this.user.username}/authToken`,
      {
        headers: {
          "Authorization": this.user.secret,
          "Session": this.user.sessionID
        }
      });

    return fetch(clientTokenRequest)
      .then(res => {
        if (res.ok)
          return res.json()
            .then(data => this.user.authToken = data.access_token)
            .then(() => this);
        else {
          this._status= STATUS_FAILURE;
          res.json()
            .then(err => this._error = err)
            .then(() => this);
        }
      });
  }


  get user() {
    return this._user;
  }

  get status() {
    return this._status;
  }

  get error() {
    return this._error;
  }
}

export default FetchAuthToken;
