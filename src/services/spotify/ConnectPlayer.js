import {STATUS_SUCCESS} from "../backend/constants";
import fetchWithoutData from "../backend/helpers/fetchWithoutData";

class ConnectPlayer {
  constructor(deviceID, token) {
    this._status = STATUS_SUCCESS;
    this._deviceID = deviceID;
    this._token = token;
    this._error = null;
  }

  perform() {
    let payload = {
      "device_ids": [this._deviceID],
      "play": false
    };
    let playerRequest = new Request(
      'https://api.spotify.com/v1/me/player',
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this._token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        json: true
      }
    );

    return fetchWithoutData(playerRequest, this);
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
