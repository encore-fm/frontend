// parses the user data received after creating or joining a session
// comes from backend separated in user_info and auth_url
export const parseInitialUserData = (user, data) => {
  return {
    ...user,
    id: data.user_info.id,
    secret: data.user_info.secret,
    sessionID: data.user_info.session_id,
    isAdmin: data.user_info.is_admin,
    score: data.user_info.score,
    authUrl: data.auth_url,
    spotifyAuthorized: data.spotify_authorized,
    spotifySynchronized: data.spotify_synchronized,
  }
};

// parses the user data received from a user info request
export const parseUserInfo = (user, data) => {
  return {
    ...user,
    id: data.id,
    secret: data.secret,
    sessionID: data.session_id,
    isAdmin: data.is_admin,
    score: data.score,
    spotifyAuthorized: data.spotify_authorized,
    spotifySynchronized: data.spotify_synchronized,
  }
};
