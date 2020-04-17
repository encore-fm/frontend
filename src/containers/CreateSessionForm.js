import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import DefaultTextField from '../components/DefaultTextField';
import Button from '../components/Button';
import {createSession} from "../actions/user";

const CreateSessionForm = (props) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const {isLogged, user} = props;
    if (isLogged) window.location.href = user.authUrl;
  });

  const updateField = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.dispatch(createSession(username));
  };

  return (
    <form onSubmit={handleSubmit}>
      <DefaultTextField
        placeholder="username"
        autofocus={true}
        value={username}
        onChange={updateField}
        error={props.error}
      />
      <br/>
      <Button type="submit" text="go"/>
    </form>
  )
};

export default connect(
  state => ({
    isLogged: state.isLogged,
    user: state.user,
    error: state.error
  })
)(CreateSessionForm);
