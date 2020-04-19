import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {API_BASE_URL} from "../services/backend/constants";
import {initPlayerState, pause, play, setPlayerState, skip} from "../actions/player";

import "./Player.scss";
import AdminPlayerControls from "../components/PlayerControls/AdminPlayerControls";
import UserPlayerControls from "../components/PlayerControls/UserPlayerControls";

const Player = (props) => {
  const {user, player} = props;

  useEffect(() => {
      props.dispatch(initPlayerState(user));
      // register sse event source
      const eventSource = new EventSource(`${API_BASE_URL}/events/${user.username}/${user.sessionID}`);

      // listen for incoming player state change events and set the state player accordingly
      eventSource.addEventListener(
        'sse:player_state_change',
        e => handlePlayerStateChange(JSON.parse(e.data))
      );

      // clean up when component unmounts
      return () => eventSource.close();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handlePlayerStateChange = data => {
    props.dispatch(setPlayerState(data));
  };

  const handlePlayPause = (setPlaying) => {
    setPlaying ? props.dispatch(play(user)) : props.dispatch(pause(user));
  };

  const handleSkip = () => {
    props.dispatch(skip(user));
  };

  if (!player || !player.current_song) return "";

  const {current_song} = player;

  return (
    <div className="Player">
      <img src={current_song.cover_url} alt={current_song.name}/>
      <div className="Player__songInfo">
        {current_song.name}<br />
        {current_song.album_name}<br/>
        {current_song.artists.join(', ')}<br/>
        <br />
        suggested by <span className="highlight">{current_song.suggested_by}</span>
      </div>
      {user.isAdmin ?
        <AdminPlayerControls
          isPlaying={player.is_playing}
          handlePlayPause={handlePlayPause}
          handleSkip={handleSkip}
        /> :
        <UserPlayerControls
          isPlaying={player.is_playing}
        />}
    </div>
  )
};

export default connect(
  state => ({
    user: state.user,
    player: state.player,
  })
)(Player);
