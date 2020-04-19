import React from "react";

import './SearchResultsElement.scss'
import IconPlus from "./icons/IconPlus";

const zeroPad = (num, places) => String(num).padStart(places, '0');

const millisToString = (millis) => {
  const seconds = Math.floor(millis / 1000);
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${zeroPad(seconds % 60, 2)}`
};

const SearchResultsElement = ({song, handleSuggest}) => {
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

  return (
    <div className="SearchResultsElement">
      <img src={coverUrl} alt={trackName} />
      <div className="SearchResultsElement__songInfo">
        {trackName}<br />
        {albumName}<br />
        {artists.slice(0, 3).join(', ')}<br /><br />
        {millisToString(trackDuration)}
      </div>
      <div className="SearchResultsElement__addButton">
        <IconPlus onClick={handleClick}/>
      </div>
    </div>
  )
};

export default SearchResultsElement;
