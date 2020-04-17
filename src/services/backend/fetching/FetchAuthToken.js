import {API_BASE_URL, STATUS_SUCCESS} from "../constants";
import fetchWithData from "../helpers/fetchWithData";

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

    return fetchWithData(clientTokenRequest, this,
        data => this.user.authTagLength = data.access_token);
  }


  get user() {
    return this._user;
  }

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
  }

  get error() {
    return this._error;
  }

  set error(value) {
    this._error = value;
  }
}

export default FetchAuthToken;
