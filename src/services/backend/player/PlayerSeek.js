import {API_BASE_URL, STATUS_SUCCESS} from "../constants";
import fetchWithoutData from "../helpers/fetchWithoutData";

class PlayerSeek {
  constructor(user, positionMs) {
    this._status = STATUS_SUCCESS;
    this._user = user;
    this._positionMs = positionMs;
    this._error = null;
  }

  perform() {
    let seekRequest = new Request(`${API_BASE_URL}/users/${this._user.username}/player/seek/${this._positionMs}`,
      {
        method: 'POST',
        headers: {
          "Authorization": this._user.secret,
          "Session": this._user.sessionID
        }
      });

    return fetchWithoutData(seekRequest, this);
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

export default PlayerSeek;
