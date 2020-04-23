import React from "react";

import './SearchResultsElement.scss'
import IconPlus from "./icons/IconPlus";
import SongInfo from "./SongInfo";

const zeroPad = (num, places) => String(num).padStart(places, '0');

const millisToString = (millis) => {
  const seconds = Math.floor(millis / 1000);
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${zeroPad(seconds % 60, 2)}`
};

const SearchResultsElement = ({song, handleSuggest, isAdded, inPlaylist}) => {
  const {
    trackName,
    trackID,
    albumName,
    artists,
    coverUrl,
    trackDuration,
  } = song;

  const handleClick = () => {
    handleSuggest(trackID);
  };

  const infoStyle = {
    padding: '0.5em 1em',
    fontSize: '12px',
    alignSelf: 'baseline',
    flexGrow: 1,
  };

  return (
    <div className="SearchResultsElement">
      <img src={coverUrl} alt={trackName} />
      <SongInfo
        style={infoStyle}
        songName={trackName}
        album={albumName}
        artists={artists}
        duration={millisToString(trackDuration)}
      />
      <div className="SearchResultsElement__addButton">
        {(!inPlaylist || isAdded) && <IconPlus onClick={handleClick} highlight={isAdded}/>}
      </div>
    </div>
  )
};

export default SearchResultsElement;
