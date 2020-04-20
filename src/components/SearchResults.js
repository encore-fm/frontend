import React from "react";
import SearchResultsElement from './SearchResultsElement';

import './SearchResults.scss'

const SearchResults = ({searchResults, songsAdded, handleSuggest, songsInPlaylist}) => {

  return (
    <div className="SearchResults">
      {
        searchResults.map((song, i) =>
          <SearchResultsElement
            isAdded={songsAdded.includes(song.trackID)}
            inPlaylist={songsInPlaylist.includes(song.trackID)}
            song={song}
            key={i}
            handleSuggest={handleSuggest}
          />
        )}
    </div>
  )
};

export default SearchResults;
