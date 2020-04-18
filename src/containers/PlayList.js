import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {fetchPlaylist} from '../actions/playlist';
import PlayListElement from '../components/PlayListElement';
import {voteSong} from "../actions/voteSong";

const PlayList = (props) => {

  const [stateChangeCounter, setStateChanged] = useState(0);

  useEffect(() => {
      const {user} = props;
      props.dispatch(fetchPlaylist(user));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stateChangeCounter]
  );

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
