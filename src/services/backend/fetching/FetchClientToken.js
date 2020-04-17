import {API_BASE_URL, STATUS_SUCCESS} from "../constants";
import fetchWithData from "../helpers/fetchWithData";

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

    return fetchWithData(clientTokenRequest, this,
      data => this._clientToken = data.access_token);
  }

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
  }

  get clientToken() {
    return this._clientToken;
  }

  get error() {
    return this._error;
  }

  set error(value) {
    this._error = value;
  }
}

export default FetchClientToken;
