import {API_BASE_URL, STATUS_SUCCESS} from "../constants";
import fetchWithData from "../helpers/fetchWithData";

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

    return fetchWithData(listSongsRequest, this, this.parseData);
  }

  parseData = data => {
    this._playlist = this.playlist.concat(
      data.map(track => (
        {
          trackName: track.name,
          trackID: track.id,
          albumName: track.album_name,
          artists: track.artists,
          coverUrl: track.cover_url,
          trackDuration: track.duration_ms,
          suggestedBy: track.suggested_by,
          score: track.score,
          upvoters: track.upvoters,
          downvoters: track.downvoters,
        }
      )));
  };

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
  }

  get playlist() {
    return this._playlist;
  }

  get error() {
    return this._error;
  }

  set error(value) {
    this._error = value;
  }
}

export default FetchPlaylist;
