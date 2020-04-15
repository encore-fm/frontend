import {API_BASE_URL, STATUS_FAILURE, STATUS_SUCCESS} from "./constants";

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

    return fetch(suggestRequest)
      .then(res => {
        if (!res.ok) {
          this._status = STATUS_FAILURE;
          return res.json()
            .then(err => this._error = err)
            .then(() => this);
        }
      });
  }

  get status() {
    return this._status;
  }

  get error() {
    return this._error;
  }
}

export default SuggestSong;
