export default data => {
  return data.map(user => ({
    username: user.username,
    isAdmin: user.is_admin,
    score: user.score,
    isSynchronized: user.spotify_synchronized,
  }))
};
