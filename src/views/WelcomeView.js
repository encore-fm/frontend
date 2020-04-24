import React from 'react';
import ContentWrapper from '../components/ContentWrapper';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {authenticate} from "../actions/user";

const WelcomeView = (props) => {
  const {isLogged, user} = props;
  if (user) props.dispatch(authenticate(user));

  return (
    <ContentWrapper>
      <div>
        this is encore.<br/>
        <Link to="/create">create</Link> a session or <Link to="/join">join</Link>.<br/>
        <br />
        <Link to="/get-started">learn more</Link>
        {isLogged && <Redirect to="/player"/>}
      </div>
    </ContentWrapper>
  )
};

export default connect(
  state => ({
    isLogged: state.isLogged,
    user: state.user,
  })
)(WelcomeView);
