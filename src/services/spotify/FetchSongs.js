import {STATUS_FAILURE, STATUS_SUCCESS} from "../backend/constants";

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
    let searchEndpointUrl = `https://api.spotify.com/v1/search?q=${this._query}&type=track`;

    return fetch(searchEndpointUrl, {headers: {'Authorization': `Bearer ${this._token}`}})
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
    this._results =  this.results.concat(
      data.tracks.items.map(track => (
        {
          trackName: track.name,
          trackID: track.id,
          albumName: track.album.name,
          artists: track.artists.map(artist => artist.name),
          coverUrl: track.album.images[0].url,
          trackDuration: track.duration_ms
        }
      )));
  }

  get status() {
    return this._status;
  }

  get results() {
    return this._results;
  }

  get error() {
    return this._error;
  }
}

export default FetchSongs;
