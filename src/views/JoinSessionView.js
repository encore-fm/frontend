import React from 'react';
import ContentWrapper from '../components/ContentWrapper';
import {connect} from "react-redux";
import {Redirect, useParams} from "react-router-dom";
import EnterSessionIDForm from "../containers/EnterSessionIDForm";
import JoinSessionForm from "../containers/JoinSessionForm";
import {authenticate} from "../actions/user";

const JoinSessionView = (props) => {
  const {sessionID} = useParams();
  const {user, isLogged} = props;
  if (user) props.dispatch(authenticate(user));

  return (
    <ContentWrapper>
      {!sessionID && <EnterSessionIDForm />}
      {sessionID && <JoinSessionForm/>}
      {isLogged && <Redirect to="/player"/>}
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
