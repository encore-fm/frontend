import React from 'react';
import ContentWrapper from '../components/ContentWrapper';
import CreateSessionForm from "../containers/CreateSessionForm";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {authenticate} from "../actions/user";

const CreateSessionView = (props) => {
  const {user, isLogged} = props;
  if (user) props.dispatch(authenticate(user));

  return (
    <ContentWrapper>
      creating a new session.<br />
      please choose your username.<br />
      <br />

      <CreateSessionForm/>
      {isLogged && user.spotifyAuthorized && <Redirect to="/player"/>}
    </ContentWrapper>
  )
};

export default connect(
  state => ({
    user: state.user,
    isLogged: state.isLogged,
  })
)(CreateSessionView);
