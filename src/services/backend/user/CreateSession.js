import {API_BASE_URL, STATUS_SUCCESS} from "../constants";
import fetchWithData from "../helpers/fetchWithData";
import {parseInitialUserData} from "../helpers/parseUser";

class CreateSession {
  constructor(adminName) {
    // request status constant
    this._status = STATUS_SUCCESS;
    this._user = {
      username: adminName,
    };
    this._error = null;
  }

  // creates a session and returns the current instance
  perform() {
    let createRequest = new Request(`${API_BASE_URL}/admin/${this.user.username}/createSession`,
      {method: 'POST'});

    return fetchWithData(createRequest, this, this.parseData);
  }

  parseData = data => {
    this._user = parseInitialUserData(this._user, data)
  };

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
  }

  get user() {
    return this._user;
  }

  get error() {
    return this._error;
  }

  set error(value) {
    this._error = value;
  }
}

export default CreateSession;
