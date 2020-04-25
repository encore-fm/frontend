import React from "react";
import {Link} from "react-router-dom";
import {logOut} from "../actions/user";

const SessionNotFoundView = (props) => {
  // clear the redux state and the local storage
  localStorage.clear();
  props.dispatch(logOut()); // clears user, isLogged and error

  return (
   <div className="SessionNotFoundView">
     it looks like the session you were in does not exist anymore.<br />
     <Link to="/create">create</Link> a new session or <Link to="/join">join</Link> one.
   </div>
  )
};
