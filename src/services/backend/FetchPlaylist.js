import {API_BASE_URL, STATUS_FAILURE, STATUS_SUCCESS} from "./constants";

class FetchPlaylist {
  constructor(user) {
    this._status = STATUS_SUCCESS;
    this._user = user;
    this._playlist = [];
    this._error = null;
  }

  perform() {
    let listSongsRequest = new Request(`${API_BASE_URL}/users/${this._user.username}/listSongs`,
      {
        headers: {
          "Authorization": this._user.secret,
          "Session": this._user.sessionID
        }
      });

    return fetch(listSongsRequest)
      .then(res => {
        if (res.ok)
          return res.json()
            .then(data => this.parseData(data))
            .then(() => this);
        else {
          this._status = STATUS_FAILURE;
          return res.json()
            .then(err => this._error = err)
            .then(() => this);
        }
      });
  }

  parseData(data) {
    this._playlist = this.playlist.concat(
      data.map(track => (
        {
          trackName: track.name,
          trackID: track.id,
          albumName: track.album_name,
          artists: track.artists,
          coverUrl: track.cover_url,
          trackDuration: track.duration_ms
        }
      )));
  }

  get status() {
    return this._status;
  }

  get playlist() {
    return this._playlist;
  }

  get error() {
    return this._error;
  }
}

export default FetchPlaylist;
