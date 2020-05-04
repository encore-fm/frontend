import React, {useEffect} from 'react';
import ContentWrapper from '../components/ContentWrapper';
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import EnterSessionIDForm from "../containers/EnterSessionIDForm";
import JoinSessionForm from "../containers/JoinSessionForm";
import {authenticate} from "../actions/user";

const JoinSessionView = (props) => {

  const {sessionID} = useParams();
  const {user} = props;

  useEffect(() => {
    if (user) props.dispatch(authenticate(user));
  }, []);

  return (
    <ContentWrapper>
      {!sessionID && <EnterSessionIDForm/>}
      {sessionID && <JoinSessionForm/>}
    </ContentWrapper>
  )
};

export default connect(
  state => ({
    user: state.user,
  })
)(JoinSessionView);
