import {STATUS_FAILURE, STATUS_SUCCESS} from "../backend/constants";

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

    return fetch(playerRequest)
      .then(res => {
        if (!res.ok) {
          this._status = STATUS_FAILURE;
          return res.json()
            .then(err => this._error = err)
            .then(() => this);
        }
        else
          return this;
      });
  }

  get status() {
    return this._status;
  }

  get error() {
    return this._error;
  }
}
