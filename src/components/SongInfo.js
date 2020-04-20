import React from "react";

import "./SongInfo.scss";

const SongInfo = ({songName, album, artists, suggestedBy, duration, style}) => {
  return (
    <div className={`SongInfo`} style={style}>
      <div className="SongInfo__content">
        <div className="SongInfoElement SongInfo__songName">{songName}</div>
        <div className="SongInfoElement SongInfo__album">{album}</div>
        <div className="SongInfoElement SongInfo__artists">{artists.join(', ')}</div>
        {suggestedBy && <div className="SongInfoElement SongInfo__suggestedBy">
          suggested by <span className="highlight">{suggestedBy}</span>
        </div>}
        {duration && (
          <div className="SongInfoElement SongInfo__duration">{duration}</div>
        )}
      </div>
    </div>
  )
};

export default SongInfo;
