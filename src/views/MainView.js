import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import PlayList from '../containers/PlayList';
import SongSearch from '../containers/SongSearch';
import {authenticate} from "../actions/user";
import Player from "../containers/Player";
import isLogged from "../reducers/isLogged";

const MainView = (props) => {
  const {user} = props;
  if (user) props.dispatch(authenticate(user));
  const path = window.location.pathname;

  return (
    <div className="MainView">
      {path === '/player' && <PlayList/>}
      {path === '/add' && <SongSearch/>}
      <Player />
      {!isLogged && <Redirect to="/"/>}
    </div>
  )
};

export default connect(
  state => ({
    isLogged: state.isLogged,
    user: state.user,
  })
)(MainView);

