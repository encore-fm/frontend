import {STATUS_SUCCESS} from "../backend/constants";
import fetchWithData from "../helpers/fetchWithData";
import parseSpotifyTracks from "../helpers/parseSpotifyTracks";

class FetchSongs {
  constructor(query, token) {
    this._status = STATUS_SUCCESS;
    this._query = query;
    this._token = token;
    this._results = [];
    this._error = null;
  }

  // executes the spotify search request with the given query
  perform() {
    let searchRequest = new Request(`https://api.spotify.com/v1/search?q=${this._query}&type=track`, {
      headers: {'Authorization': `Bearer ${this._token}`}
    });

    return fetchWithData(searchRequest, this, this.parseData);
  }

  parseData = data => {
    this._results = parseSpotifyTracks(this.results, data.tracks.items); // song data is in data.tracks.items
  };

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
  }

  get results() {
    return this._results;
  }

  get error() {
    return this._error;
  }

  set error(value) {
    this._error = value;
  }
}

export default FetchSongs;
