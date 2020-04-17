import {API_BASE_URL, STATUS_SUCCESS} from "../constants";
import fetchWithoutData from "../helpers/fetchWithoutData";

class PlayerPlay {
  constructor(user) {
    this._status = STATUS_SUCCESS;
    this._user = user;
    this._error = null;
  }

  perform() {
    let playRequest = new Request(`${API_BASE_URL}/users/${this._user.username}/player/play`,
      {
        method: 'POST',
        headers: {
          "Authorization": this._user.secret,
          "Session": this._user.sessionID
        }
      });

    return fetchWithoutData(playRequest, this);
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

export default PlayerPlay;
