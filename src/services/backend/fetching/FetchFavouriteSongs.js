// service instance used to fetch a user's top Spotify tracks
import {API_BASE_URL, STATUS_SUCCESS} from "../constants";
import fetchWithData from "../../helpers/fetchWithData";
import {parseFavouriteSongs} from "../../helpers/parseSpotifyTracks";

class FetchFavouriteSongs {
  constructor(user) {
    this._status = STATUS_SUCCESS;
    this._user = user;
    this._results = [];
    this._error = null;
  }

  perform() {
    let favouriteSongsRequest = new Request(`${API_BASE_URL}/users/${this._user.username}/favouriteSongs`,
      {
        headers: {
          "Authorization": this._user.secret,
          "Session": this._user.sessionID
        }
      });

    return fetchWithData(favouriteSongsRequest, this,
      data => this._results = parseFavouriteSongs(this.results, data));
  }

  get results() {
    return this._results;
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

export default FetchFavouriteSongs;
