class User {
  constructor(username, sessionID) {
    this.username = username;
    this.secret = '';
    this.sessionID = sessionID;
  }

  // sends a join request to the backend server and sets the user's secret field.
  async join() {
    // todo...
  }

  async listSongs() {
    // todo...
  }

  async suggest(songID) {
    // todo...
  }

  async vote(songID, voteAction) {
    // todo...
  }

  async fetchClientToken() {
    // todo...
  }

  async fetchAuthToken() {
    // todo...
  }

}

export default User;
