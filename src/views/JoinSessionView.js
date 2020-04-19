import React from 'react';
import ContentWrapper from '../components/ContentWrapper';
import {connect} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import EnterSessionIDForm from "../containers/EnterSessionIDForm";
import JoinSessionForm from "../containers/JoinSessionForm";
import {authenticate} from "../actions/user";

const JoinSessionView = (props) => {
  const {sessionID} = useParams();
  const history = useHistory();
  const {user, isLogged} = props;

  // redirect user to player view if already logged in
  if (user) {
    props.dispatch(authenticate(user))
      .then(_ => {
        if (isLogged && user && user.spotifyAuthorized) history.push("/player");
      });
  }

  return (
    <ContentWrapper>
      {!sessionID && <EnterSessionIDForm />}
      {sessionID && <JoinSessionForm/>}
    </ContentWrapper>
  )
};

export default connect(
  state => ({
    user: state.user,
    isLogged: state.isLogged,
    sessionInfo: state.sessionInfo,
  })
)(JoinSessionView);
