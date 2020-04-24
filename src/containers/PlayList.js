import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchPlaylist} from '../actions/playlist';
import PlayListElement from '../components/PlayListElement';
import {voteSong} from "../actions/voteSong";

import './PlayList.scss';
import {closeMenu} from "../actions/menu";
import {Link} from "react-router-dom";

const PlayList = (props) => {
  const {user, playlist} = props;

  useEffect(() => {
    props.dispatch(fetchPlaylist(user));
  }, []);

  const handleVote = (songID, isUpvote) => {
    const voteAction = isUpvote ? 'up' : 'down';
    props.dispatch(voteSong(user, songID, voteAction));
  };

  const handleClickAdd = () => {
    props.dispatch(closeMenu())
  };

  return (
    <div className="PlayList">
      {playlist.length > 0 && playlist.map((song, i) => (
        <PlayListElement
          key={i}
          song={song}
          username={user.username}
          handleVote={handleVote}
          borderBottom={i !== playlist.length - 1}
        />
      ))}
      {playlist.length === 0 && (
        <div className="Playlist__emptyHelp">
          playlist is currently empty.<br />
          you can suggest songs by clicking <Link to="/add" onClick={handleClickAdd}>add</Link> on the top right corner.<br />
          <br />
          <Link to="/get-started">learn more</Link>
        </div>
      )}
    </div>
  )
};

export default connect(
  state => ({
    playlist: state.playlist,
    user: state.user,
  })
)(PlayList);
