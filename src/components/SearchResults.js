import React from "react";
import SearchResultsElement from './SearchResultsElement';

import './SearchResults.scss'

const SearchResults = ({songs, handleSuggest}) => {
  return (
    <div className="SearchResults">
      {songs.map((song, i) => <SearchResultsElement song={song} key={i} handleSuggest={handleSuggest}/>)}
    </div>
  )
};

export default SearchResults;
