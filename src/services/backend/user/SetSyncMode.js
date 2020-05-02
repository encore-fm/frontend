import {API_BASE_URL, STATUS_SUCCESS} from "../constants";
import fetchWithoutData from "../../helpers/fetchWithoutData";

class SetSyncMode {
  constructor(user, syncMode) {
    this._status = STATUS_SUCCESS;
    this._user = user;
    this._syncMode = syncMode;
    this._error = null;
  }

  perform() {
    let syncModeRequest = new Request(`${API_BASE_URL}/users/${this._user.username}/setSyncMode/${this.syncMode}`,
      {
        method: 'POST',
        headers: {
          "Authorization": this._user.secret,
          "Session": this._user.sessionID,
        }
      });

    return fetchWithoutData(syncModeRequest, this);
  }

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
  }

  get syncMode() {
    return this._syncMode;
  }

  get error() {
    return this._error;
  }

  set error(value) {
    this._error = value;
  }
}

export default SetSyncMode;
