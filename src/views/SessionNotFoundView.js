import React from "react";
import {Link} from "react-router-dom";
import {logOut} from "../actions/user";
import {connect} from "react-redux";
import ContentWrapper from "../components/ContentWrapper";

const SessionNotFoundView = (props) => {
  // clear the redux state and the local storage
  localStorage.clear();
  props.dispatch(logOut()); // clears user, isLogged and error

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
  })
)(SessionNotFoundView)
