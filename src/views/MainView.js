import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import PlayList from '../containers/PlayList';
import SongSearch from '../containers/SongSearch';
import {authenticate} from "../actions/user";
import Player from "../containers/Player";
import {setPlayerState} from "../actions/player";
import parsePlaylist from "../services/backend/helpers/parsePlaylist";
import {setPlaylist} from "../actions/playlist";
import {API_BASE_URL} from "../services/backend/constants";

const MainView = (props) => {
  const {isLogged, user} = props;

  // initialize event source and close it when component unmounts
  useEffect(() => {
    if (!user) return;

    // authenticate user
    props.dispatch(authenticate(user));
    // register sse event source
    const eventSource = new EventSource(`${API_BASE_URL}/events/${user.username}/${user.sessionID}`);
    // listen for incoming playlist change events and set the state playlist accordingly
    eventSource.addEventListener(
      'sse:playlist_change',
      e => handlePlaylistChange(JSON.parse(e.data))
    );
    // listen for incoming player state change events and set the state player accordingly
    eventSource.addEventListener(
      'sse:player_state_change',
      e => handlePlayerStateChange(JSON.parse(e.data))
    );

    return () => eventSource.close()
  }, []);

  const handlePlaylistChange = data => {
    const newPlaylist = parsePlaylist(data);
    props.dispatch(setPlaylist(newPlaylist));
  };
  const handlePlayerStateChange = data => props.dispatch(setPlayerState(data));

  const renderIsLogged = () => {
    const path = window.location.pathname;
    switch (path) {
      case '/player':
        return (
          <React.Fragment>
            <PlayList />
            <Player />
          </React.Fragment>
      );
      case '/add':
        return (
          <React.Fragment>
            <SongSearch />
            <Player />
          </React.Fragment>
        );
    }
  };
  const redirect = <Redirect to="/"/>;

  return (
    <div className="MainView">
      {isLogged ? renderIsLogged() : redirect}
    </div>
  )
};

export default connect(
  state => ({
    isLogged: state.isLogged,
    user: state.user,
  })
)(MainView);

