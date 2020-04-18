import React from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';

import PlayList from '../containers/PlayList';
import SongSearch from '../containers/SongSearch';

const MainView = (props) => {

  // redirect user to welcome view if not logged in
  const history = useHistory();
  if (!props.isLogged) history.push("/");

  const path = window.location.pathname;

  return (
    <div className="MainView">
      {path === '/player' && <PlayList/>}
      {path === '/add' && <SongSearch/>}
    </div>
  )
};

export default connect(
  state => ({
    isLogged: state.isLogged,
  })
)(MainView);

