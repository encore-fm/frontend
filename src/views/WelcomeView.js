import React from 'react';
import ContentWrapper from '../components/ContentWrapper';
import {Link, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {authenticate} from "../actions/user";

const WelcomeView = (props) => {
  const history = useHistory();
  const {user} = props;

  // redirect user to player view if already logged in
  if (user) {
    props.dispatch(authenticate(user))
      .then(_ => {
        if (props.isLogged) history.push("/player");
      });
  }

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
    user: state.user,
  })
)(WelcomeView);
