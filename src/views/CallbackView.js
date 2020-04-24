import React from "react";
import {useParams} from "react-router-dom";
import {connect} from "react-redux";

import './CallbackView.scss';

const CallbackView = (props) => {
  const {state} = useParams();
  const {user} = props;

  if (state === 'success') window.close();

  return (
    <div className="CallbackAuthError">
      spotify authorization failed.<br />
      click <a href={user.authUrl}>here</a> to try again.<br />
      close the window to cancel.
    </div>
  )
};

export default connect(
  state => ({
    user: state.user,
  })
)(CallbackView);