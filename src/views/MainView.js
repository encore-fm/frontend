import React from 'react';
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom';

import PlayList from '../containers/PlayList';

const MainView = (props) => {

  // redirect user to welcome view if not logged in
  const history = useHistory();
  if (!props.isLogged) history.push("/");

  return (
    <PlayList/>
  )
};

export default connect(
  state => ({
    isLogged: state.isLogged,
  })
)(MainView);

