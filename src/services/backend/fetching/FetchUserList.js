import {API_BASE_URL, STATUS_SUCCESS} from "../constants";
import fetchWithData from "../../helpers/fetchWithData";
import parseUserList from "../../helpers/parseUserList";

class FetchUserList {
  constructor(user) {
    this._status = STATUS_SUCCESS;
    this._user = user;
    this._userList = [];
    this._error = null;
  }

  perform() {
    const listUsersRequest = new Request(`${API_BASE_URL}/users/${this._user.username}/list`,
      {
        headers: {
          "Authorization": this._user.secret,
          "Session": this._user.sessionID
        }
      });

    return fetchWithData(listUsersRequest, this, this.parse);
  }

  parse = (data) => {
    this._userList = parseUserList(data);
  };

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
  }

  get userList() {
    return this._userList;
  }

  get error() {
    return this._error;
  }

  set error(value) {
    this._error = value;
  }
}

export default FetchUserList;
