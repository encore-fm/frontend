export const parseUserData = (user, data) => {
  return {
    ...user,
    id: data.user_info.id,
    secret: data.user_info.secret,
    sessionID: data.user_info.session_id,
    isAdmin: data.user_info.is_admin,
    score: data.user_info.score,
    authUrl: data.auth_url,
    spotifyAuthorized: data.spotify_authorized,
  }
};
