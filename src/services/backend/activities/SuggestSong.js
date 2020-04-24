import {API_BASE_URL, STATUS_SUCCESS} from "../constants";
import fetchWithoutData from "../../helpers/fetchWithoutData";

class SuggestSong {
  constructor(user, songID) {
    this._status = STATUS_SUCCESS;
    this._user = user;
    this._songID = songID;
    this._error = null;
  }

  perform() {
    let suggestRequest = new Request(`${API_BASE_URL}/users/${this._user.username}/suggest/${this._songID}`,
      {
        method: 'POST',
        headers: {
          "Authorization": this._user.secret,
          "Session": this._user.sessionID
        }
      });

    return fetchWithoutData(suggestRequest, this);
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

export default SuggestSong;
