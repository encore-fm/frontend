import React from 'react';
import ContentWrapper from '../components/ContentWrapper';
import CreateSessionForm from "../containers/CreateSessionForm";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {authenticate} from "../actions/user";

const CreateSessionView = (props) => {
  const {user, isLogged} = props;
  const history = useHistory();

  // redirect user to player view if already logged in
  if (user) {
    props.dispatch(authenticate(user))
      .then(_ => {
        if (isLogged && user && user.spotifyAuthorized) history.push("/player");
      });
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
