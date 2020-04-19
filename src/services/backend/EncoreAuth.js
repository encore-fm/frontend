import {API_BASE_URL, STATUS_SUCCESS} from "./constants";
import fetchWithoutData from "./helpers/fetchWithoutData";

class EncoreAuth {
  constructor(user) {
    this._status = STATUS_SUCCESS;
    this._user = user;
    this._error = null;
  }

  perform() {
    let pingRequest = new Request(`${API_BASE_URL}/users/${this._user.username}/ping`,
      {
        method: 'POST',
        headers:
          {
            "Authorization": this._user.secret,
            "Session": this._user.sessionID
          }
      });

    return fetchWithoutData(pingRequest, this);
  }
}

export default EncoreAuth;
