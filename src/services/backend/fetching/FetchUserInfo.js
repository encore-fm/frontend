import {API_BASE_URL, STATUS_SUCCESS} from "../constants";
import fetchWithData from "../helpers/fetchWithData";
import {parseUserInfo} from "../helpers/parseUser";

class FetchUserInfo {
  constructor(user) {
    this._status = STATUS_SUCCESS;
    this._user = null;
    this._error = null;
    this._user = user;
  }

  perform() {
    let syncStateRequest = new Request(`${API_BASE_URL}/users/${this._user.username}/info`,
      {
        method: 'GET',
        headers: {
          "Authorization": this._user.secret,
          "Session": this._user.sessionID
        }
      });

    return fetchWithData(syncStateRequest, this,
        data => this._user = parseUserInfo(this.user, data));
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

export default FetchUserInfo;
