import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchPlaylist} from '../actions/playlist';
import PlayListElement from '../components/PlayListElement';
import {voteSong} from "../actions/voteSong";

import './PlayList.scss';

const PlayList = (props) => {
  const {user, playlist} = props;

  useEffect(() => {
      props.dispatch(fetchPlaylist(user));
    },
    []
  );

  const handleVote = (songID, isUpvote) => {
    const voteAction = isUpvote ? 'up' : 'down';
    props.dispatch(voteSong(user, songID, voteAction));
  };

  return (
    <div className="PlayList">
      {playlist.map((song, i) => (
        <PlayListElement
          key={i}
          song={song}
          username={user.username}
          handleVote={handleVote}
          borderBottom={i !== playlist.length - 1}
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
