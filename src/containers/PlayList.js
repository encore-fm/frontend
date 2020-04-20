import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {fetchPlaylist, setPlaylist} from '../actions/playlist';
import PlayListElement from '../components/PlayListElement';
import {voteSong} from "../actions/voteSong";
import {API_BASE_URL} from "../services/backend/constants";
import parsePlaylist from "../services/backend/helpers/parsePlaylist";

import './PlayList.scss';
import {synchronize} from "../actions/user";

const PlayList = (props) => {
  const {user} = props;

  useEffect(() => {
      props.dispatch(fetchPlaylist(user));

      // set the synchronized state
      // if user is not spotify authorized, backend returns synchronized: false
      props.dispatch(synchronize(user));

      // register sse event source
      const eventSource = new EventSource(`${API_BASE_URL}/events/${user.username}/${user.sessionID}`);

      // listen for incoming playlist change events and set the state playlist accordingly
      eventSource.addEventListener(
        'sse:playlist_change',
        e => handlePlaylistChange(JSON.parse(e.data))
      );

      // clean up when component unmounts
      return () => eventSource.close();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handlePlaylistChange = data => {
    const newPlaylist = parsePlaylist(data);

    props.dispatch(setPlaylist(newPlaylist));
  };

  const handleVote = (songID, isUpvote) => {
    const voteAction = isUpvote ? 'up' : 'down';
    props.dispatch(voteSong(props.user, songID, voteAction));
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
