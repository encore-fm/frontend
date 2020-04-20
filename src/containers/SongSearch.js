import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import SearchTextField from "../components/SearchTextField";
import {clearSongs, fetchSongs} from "../actions/songs";
import SearchResults from "../components/SearchResults";
import {fetchClientToken} from "../actions/clientToken";

import './SongSearch.scss'
import {suggestSong} from "../actions/suggestSong";
import {useHistory} from "react-router-dom";

const SongSearch = (props) => {
  const history = useHistory();
  const [query, setQuery] = useState('');
  const [songsAdded, setSongsAdded] = useState([]);

  const {clientToken, user, searchResults, error, playlist} = props;

  useEffect(() => {
    if (!clientToken) {
      props.dispatch(fetchClientToken(user));
      return
    }
    if (query) props.dispatch(fetchSongs(query, clientToken));
    else props.dispatch(clearSongs());
  }, [query, clientToken]);

  const handleClose = () => {
    history.push("/player");
  };

  const handleSearchFieldChange = (event) => {
    setQuery(event.target.value)
  };

  const handleSuggest = (songID) => {
    props.dispatch(suggestSong(user, songID)).then(() => {
      if (!error.error) {
        setSongsAdded([...songsAdded, songID])
      }
    });
  };

  return (
    <div className="SongSearch">
      <SearchTextField onChange={handleSearchFieldChange} value={query} onClose={handleClose}/>
      <SearchResults searchResults={searchResults} songsAdded={songsAdded} handleSuggest={handleSuggest} songsInPlaylist={playlist.map(song => song.trackID)}/>
    </div>
  )
};

export default connect(state => ({
  user: state.user,
  clientToken: state.clientToken,
  searchResults: state.songs,
  error: state.error,
  playlist: state.playlist,
}))(SongSearch);
