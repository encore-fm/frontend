export default (results, data) => {
  return results.concat(
    data.map(track => (
      {
        trackName: track.name,
        trackID: track.id,
        albumName: track.album.name,
        artists: track.artists.map(artist => artist.name),
        coverUrl: track.album.images[0] ? track.album.images[0].url : null,
        trackDuration: track.duration_ms
      }
    )));
};
