import {API_BASE_URL, STATUS_FAILURE, STATUS_SUCCESS} from "./constants";

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

    return fetch(voteRequest)
      .then(res => {
        if (!res.ok) {
          this._status = STATUS_FAILURE;
          res.json()
            .then(err => this._error = err)
            .then(() => this);
        }
      })
  }

  get status() {
    return this._status;
  }

  get error() {
    return this._error;
  }
}

export default VoteSong;
