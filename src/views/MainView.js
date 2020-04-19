import React from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';

import PlayList from '../containers/PlayList';
import SongSearch from '../containers/SongSearch';
import {authenticate} from "../actions/user";
import Player from "../containers/Player";

const MainView = (props) => {
  const history = useHistory();
  const {user} = props;

  // redirect user to welcome view if not logged in
  if (!user) history.push("/");

  // authenticate user
  props.dispatch(authenticate(user))
    .then(_ => {
      if (!props.isLogged) history.push("/");
    });

  const path = window.location.pathname;

  return (
    <div className="MainView">
      {path === '/player' && <PlayList/>}
      {path === '/add' && <SongSearch/>}
      <Player />
    </div>
  )
};

export default connect(
  state => ({
    isLogged: state.isLogged,
    user: state.user,
  })
)(MainView);

