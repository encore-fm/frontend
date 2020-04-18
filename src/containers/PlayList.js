import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {fetchPlaylist, setPlaylist} from '../actions/playlist';
import PlayListElement from '../components/PlayListElement';
import {voteSong} from "../actions/voteSong";
import {API_BASE_URL} from "../services/backend/constants";
import parsePlaylist from "../services/backend/helpers/parsePlaylist";
import {setPlayerState} from "../actions/player";

import './PlayList.scss';

const PlayList = (props) => {

  const [stateChangeCounter, setStateChanged] = useState(0);

  useEffect(() => {
      const {user} = props;
      props.dispatch(fetchPlaylist(user));

      // register sse event source
      let eventSource = new EventSource(`${API_BASE_URL}/events/${user.username}/${user.sessionID}`);

      // listen for incoming playlist change events and set the state playlist accordingly
      eventSource.addEventListener('sse:playlist_change',
        e => handlePlaylistChange(JSON.parse(e.data)));

      // listen for incoming player state change events and set the state player accordingly
      eventSource.addEventListener('sse:player_state_change',
          e => handlePlayerStateChange(JSON.parse(e.data)));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stateChangeCounter]
  );

  const handlePlaylistChange = data => {
    let newPlaylist = parsePlaylist(data);

    props.dispatch(setPlaylist(newPlaylist));
  };

  const handlePlayerStateChange = data => {
    let newPlayerState = {
      currentSong: data.current_song,
      isPlaying: data.is_playing,
      progress: data.progress
    };

    props.dispatch(setPlayerState(newPlayerState));
  };

  const handleVote = (songID, isUpvote) => {
    const voteAction = isUpvote ? 'up' : 'down';
    props.dispatch(voteSong(props.user, songID, voteAction)).then(
      () => setStateChanged(stateChangeCounter + 1)
    );
  };

  return (
    <div className="PlayList">
      {props.playlist.map((song, i) => (
        <PlayListElement
          key={i}
          song={song}
          username={props.user.username}
          handleVote={handleVote}
        />
      ))}
    </div>
  )
};

export default connect(
  state => ({
    playlist: state.playlist,
    user: state.user,
  })
)(PlayList);
