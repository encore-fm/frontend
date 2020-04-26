import React, {useEffect} from 'react';
import ContentWrapper from '../components/ContentWrapper';
import CreateSessionForm from "../containers/CreateSessionForm";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {authenticate} from "../actions/user";

const CreateSessionView = (props) => {
  const {user, isLogged} = props;
  useEffect(() => {
    if (user) props.dispatch(authenticate(user));
  }, []);

  if (isLogged && user.spotifyAuthorized) {
    return <Redirect to="/player"/>
  }

  return (
    <ContentWrapper>
      creating a new session.<br />
      please choose your username.<br />
      <br />
      <CreateSessionForm/>
    </ContentWrapper>
  )
};

export default connect(
  state => ({
    user: state.user,
    isLogged: state.isLogged,
  })
)(CreateSessionView);
