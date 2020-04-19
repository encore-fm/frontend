import {API_BASE_URL, STATUS_SUCCESS} from "../constants";
import fetchWithData from "../helpers/fetchWithData";

class FetchSessionInfo {
  constructor(sessionID) {
    this._status = STATUS_SUCCESS;
    this._sessionID = sessionID;
    this._sessionInfo = {};
    this._error = null;
  }

  perform() {
    let fetchSessionInfoRequest = new Request(`${API_BASE_URL}/sessionInfo/${this._sessionID}`);

    return fetchWithData(fetchSessionInfoRequest, this, this.parseData);
  }

  parseData = data => {
    this._sessionInfo = {
      ...data,
    }
  };

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
  }

  get sessionInfo() {
    return this._sessionInfo;
  }

  get error() {
    return this._error;
  }

  set error(value) {
    this._error = value;
  }
}

export default FetchSessionInfo;
