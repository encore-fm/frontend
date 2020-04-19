import React from 'react';
import ContentWrapper from '../components/ContentWrapper';
import {Link, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';

const WelcomeView = (props) => {

  // redirect user to player view if already logged in
  const history = useHistory();
  if (props.isLogged) history.push("/player");

  return (
    <ContentWrapper>
      <div>
        this is encore.<br/>
        <Link to="/create">create</Link> a session or <Link to="/join">join</Link>.
      </div>
    </ContentWrapper>
  )
};

export default connect(
  state => ({
    isLogged: state.isLogged,
  })
)(WelcomeView);
