import {API_BASE_URL, STATUS_SUCCESS} from "../constants";
import fetchWithData from "../../helpers/fetchWithData";

class PlayerDesynchronize {
  constructor(user) {
    this._status = STATUS_SUCCESS;
    this._user = user;
    this._synchronized = true;
    this._error = null;
  }

  perform() {
    let desyncRequest = new Request(`${API_BASE_URL}/users/${this._user.username}/player/desynchronize`,
      {
        method: 'POST',
        headers: {
          "Authorization": this._user.secret,
          "Session": this._user.sessionID
        }
      });

    return fetchWithData(desyncRequest, this,
      data => this._synchronized = data.synchronized);
  }

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
  }

  get synchronized() {
    return this._synchronized;
  }

  get error() {
    return this._error;
  }

  set error(value) {
    this._error = value;
  }
}

export default PlayerDesynchronize;
