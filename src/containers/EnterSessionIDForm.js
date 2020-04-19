import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import DefaultTextField from '../components/DefaultTextField';
import Button from '../components/Button';
import {fetchSessionInfo} from "../actions/sessionInfo";
import {useHistory} from "react-router-dom";

const EnterSessionIDForm = (props) => {
  const history = useHistory();
  const [sessionID, setSessionID] = useState('');

  const {user, error, sessionInfo} = props;

  useEffect(() => {
    if (sessionInfo && sessionInfo.admin_name) history.push(`/join/${sessionID}`)
  }, [sessionInfo]);

  const updateField = (event) => {
    setSessionID(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (sessionID) props.dispatch(fetchSessionInfo(user, sessionID));
  };

  const inputStyles = {
    minWidth: '400px',
  };

  return (
    <div>
      please enter a session id.<br/>
      or ask your friends for the invite link.<br/>
      <br/>
      <form onSubmit={handleSubmit}>
        <DefaultTextField
          placeholder="session id"
          autofocus={true}
          value={sessionID}
          onChange={updateField}
          error={error}
          styles={inputStyles}
        />
        <br/>
        <Button type="submit" text="next"/>
      </form>
    </div>
  )
};

export default connect(
  state => ({
    sessionInfo: state.sessionInfo,
    user: state.user,
    error: state.error,
  })
)(EnterSessionIDForm);
