import {API_BASE_URL, STATUS_SUCCESS} from "../constants";
import fetchWithoutData from "../../helpers/fetchWithoutData";

class VoteSong {
  constructor(user, songID, voteAction) {
    this._status = STATUS_SUCCESS;
    this._user = user;
    this._songID = songID;
    this._voteAction = voteAction;
    this._error = null;
  }

  perform() {
    let voteRequest = new Request(
      `${API_BASE_URL}/users/${this._user.username}/vote/${this._songID}/${this._voteAction}`,
      {
        method: 'POST',
        headers: {
          "Authorization": this._user.secret,
          "Session": this._user.sessionID
        }
      });

    return fetchWithoutData(voteRequest, this);
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

export default VoteSong;
