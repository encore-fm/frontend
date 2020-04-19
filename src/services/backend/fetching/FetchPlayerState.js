import {API_BASE_URL, STATUS_SUCCESS} from "../constants";
import fetchWithData from "../helpers/fetchWithData";

class FetchPlayerState {
  constructor(user) {
    this._status = STATUS_SUCCESS;
    this._user = user;
    this._playerState = null;
    this._error = null;
  }

  perform() {
    let playerStateRequest = new Request(`${API_BASE_URL}/users/${this._user.username}/player/state`,
      {
        headers: {
          "Authorization": this._user.secret,
          "Session": this._user.sessionID
        }
      });

    return fetchWithData(playerStateRequest, this, this.parser);
  }

  parser = data => {
    this._playerState = {
      ...data,
    }
  };

  get playerState() {
    return this._playerState;
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

export default FetchPlayerState;
