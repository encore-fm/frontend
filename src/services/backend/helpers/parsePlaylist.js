export default data => {
  return data.map(track => ({
    trackName: track.name,
    trackID: track.id,
    albumName: track.album_name,
    artists: track.artists,
    coverUrl: track.cover_url,
    trackDuration: track.duration_ms,
    suggestedBy: track.suggested_by,
    score: track.score,
    upvoters: track.upvoters,
    downvoters: track.downvoters,
  }));
};
