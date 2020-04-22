import React, {useEffect} from "react";
import {connect} from "react-redux";
import {initPlayerState, pause, play, seek, skip} from "../actions/player";

import "./Player.scss";
import AdminPlayerControls from "../components/PlayerControls/AdminPlayerControls";
import UserPlayerControls from "../components/PlayerControls/UserPlayerControls";
import SeekBar from "../components/PlayerControls/SeekBar";
import SongInfo from "../components/SongInfo";

const Player = (props) => {
  const {user, player} = props;

  useEffect(() => {
      props.dispatch(initPlayerState(user));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handlePlayPause = (setPlaying) => {
    setPlaying ? props.dispatch(play(user)) : props.dispatch(pause(user));
  };

  const handleSkip = () => {
    props.dispatch(skip(user));
  };

  const handleSeek = (position) => {
    props.dispatch(seek(user, Math.floor(position)));
  };

  const infoStyle = {
    padding: '0.5em 1em',
    fontSize: '12px',
    alignSelf: 'baseline',
    flexGrow: 1,
  };


  if (!player || !player.current_song) return "";

  const {current_song} = player;

  return (
    <div className="Player">
      <SeekBar
        modify={user.isAdmin}
        duration={current_song.duration_ms}
        progress={player.progress}
        timestamp={player.timestamp}
        playing={player.is_playing}
        handleSeek={handleSeek}
      />
      <div className="Player__content">
        <img src={current_song.cover_url} alt={current_song.name}/>
        <SongInfo
          style={infoStyle}
          songName={current_song.name}
          album={current_song.album_name}
          artists={current_song.artists}
          suggestedBy={current_song.suggested_by}
        />
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
    </div>
  )
};

export default connect(
  state => ({
    user: state.user,
    player: state.player,
  })
)(Player);
