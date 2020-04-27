import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect, useHistory} from 'react-router-dom';

import PlayList from '../containers/PlayList';
import SongSearch from '../containers/SongSearch';
import Player from "../containers/Player";
import {play, setPlayerState} from "../actions/player";
import parsePlaylist from "../services/helpers/parsePlaylist";
import {setPlaylist} from "../actions/playlist";
import {API_BASE_URL} from "../services/backend/constants";
import {deleteSession, desynchronize, fetchUserInfo, setSynchronized} from "../actions/user";
import UserList from "../containers/UserList";
import {setUserList} from "../actions/userList";
import parseUserList from "../services/helpers/parseUserList";

const MainView = (props) => {
  const {isLogged, menuOpen, user} = props;
  const {isAdmin, spotifyAuthorized} = user;
  const history = useHistory();

  // authenticate user and update fields
  useEffect(() => {
    if (!user) return;
    props.dispatch(fetchUserInfo(user));
    // block an admin from accessing his session if he's not authenticated (auth flow bug)
    if (user && user.isAdmin && user.spotifyAuthorized === false) {
      props.dispatch(deleteSession(user));
      localStorage.clear();
      history.push('/');
    }
  }, [isAdmin, spotifyAuthorized]);

  // initialize event source and close it when component unmounts
  useEffect(() => {
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
      e => props.dispatch(handleUserSynchronizedChange(JSON.parse(e.data)))
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
  const handleUserSynchronizedChange = data => props.dispatch(setSynchronized(data.synchronized));

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

