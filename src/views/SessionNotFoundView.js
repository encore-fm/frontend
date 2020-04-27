import React from "react";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import ContentWrapper from "../components/ContentWrapper";
import {REQUEST_NOT_AUTHORIZED_ERROR, SESSION_NOT_FOUND_ERROR} from "../services/backend/constants";

const SessionNotFoundView = (props) => {
  const {error} = props;
  // restrict access to this view
  // user should only land here if their credentials are invalid or if join session id is wrong
  if (error.error !== REQUEST_NOT_AUTHORIZED_ERROR && error.error !== SESSION_NOT_FOUND_ERROR)
    return <Redirect to="/"/>;

  return (
    <ContentWrapper>
      it looks like the session you are trying to access was deleted or does not exist.<br />
      <Link to="/create">create</Link> a new session or <Link to="/join">join</Link> one.
    </ContentWrapper>
  )
};

export default connect(
  state => ({
    user: state.user,
    error: state.error,
  })
)(SessionNotFoundView)
