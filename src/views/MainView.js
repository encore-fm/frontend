import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import PlayList from '../containers/PlayList';
import SongSearch from '../containers/SongSearch';
import Player from "../containers/Player";
import {setPlayerState} from "../actions/player";
import parsePlaylist from "../services/helpers/parsePlaylist";
import {setPlaylist} from "../actions/playlist";
import {API_BASE_URL} from "../services/backend/constants";
import {setSynchronized} from "../actions/user";
import UserList from "../containers/UserList";
import {setUserList} from "../actions/userList";
import parseUserList from "../services/helpers/parseUserList";

const MainView = (props) => {
  const {isLogged, menuOpen, user} = props;
  // initialize event source and close it when component unmounts
  useEffect(() => {
    if (!user) return;

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
    // listen for incoming user list change events
    eventSource.addEventListener(
      'sse:user_list_change',
      e => handleUserListChange(JSON.parse(e.data))
    );
    // listen for incoming user synchronized state change events
    eventSource.addEventListener(
      'sse:user_synchronized_change',
      e => handleUserSynchronizedChange(JSON.parse(e.data))
    );

    return () => {
      eventSource.close()
    }
  }, []);

  // sse handlers
  const handlePlaylistChange = data => {
    if (!data) return;
    const newPlaylist = parsePlaylist(data);
    props.dispatch(setPlaylist(newPlaylist));
  };
  const handlePlayerStateChange = data => props.dispatch(setPlayerState(data));
  const handleUserListChange = data => {
    if (!data) return;
    const newUserList = parseUserList(data);
    props.dispatch(setUserList(newUserList));
  };
  const handleUserSynchronizedChange = data => {
    if (data.user_id === user.id)
      props.dispatch(setSynchronized(data.synchronized));
  };

  const renderIsLogged = () => {
    const path = window.location.pathname;
    return (
      <React.Fragment>
        {menuOpen && <UserList/>}
        {!menuOpen && path === '/player' && <PlayList/>}
        {!menuOpen && path === '/add' && <SongSearch/>}
        <Player />
      </React.Fragment>
    )
  };

  return (
    <div className="MainView">
      {isLogged ? renderIsLogged() : <Redirect to="/"/>}
    </div>
  )
};

export default connect(
  state => ({
    isLogged: state.isLogged,
    user: state.user,
    menuOpen: state.menuOpen,
  })
)(MainView);

