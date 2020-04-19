import React, {useEffect} from 'react';
import ContentWrapper from '../components/ContentWrapper';
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import EnterSessionIDForm from "../containers/EnterSessionIDForm";
import {fetchSessionInfo} from "../actions/sessionInfo";
import JoinSessionForm from "../containers/JoinSessionForm";

const JoinSessionView = (props) => {
  const {sessionID} = useParams();

  const {user, sessionInfo} = props;

  useEffect(() => {
    if (sessionInfo) props.dispatch(fetchSessionInfo(user, sessionID));
  }, []);

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
