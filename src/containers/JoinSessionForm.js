import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import DefaultTextField from "../components/DefaultTextField";
import Button from "../components/Button";
import {fetchUserInfo, joinSession} from "../actions/user";
import {useParams, useHistory, Redirect} from "react-router-dom";
import {fetchSessionInfo} from "../actions/sessionInfo";
import {SESSION_NOT_FOUND_ERROR} from "../services/backend/constants";


const STAGES = Object.freeze({
  NAME: 'NAME',
  AUTH: 'AUTH',
});

const JoinSessionForm = (props) => {
  const history = useHistory();
  const {sessionID} = useParams();
  const {user, isLogged, error, sessionInfo} = props;

  const [username, setUsername] = useState('');
  const [stage, setStage] = useState(STAGES.NAME);

  useEffect(() => {
    props.dispatch(fetchSessionInfo(sessionID));
    if (user) props.dispatch(fetchUserInfo(user));
  }, []);

  useEffect(() => {
    if (!error.error) {
      if (isLogged || (stage === STAGES.NAME && sessionInfo && username)) {
        setStage(STAGES.AUTH);
      }
    }
  }, [user, error]);

  const redirectAuthorize = () => {
    if (isLogged) {
      window.open(user.authUrl, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
    }
  };

  const redirectPlayer = () => {
    if (isLogged) history.push('/player');
  };

  const handleSubmitName = event => {
    event.preventDefault();
    props.dispatch(joinSession(username, sessionID));
  };

  const updateField = (event) => {
    setUsername(event.target.value);
  };

  const renderStageName = () => {
    // only redirect if we know the session isn't valid
    // !sessionInfo doesn't suffice since the request to fetch the session info is asynchronous.
    if (error.error === SESSION_NOT_FOUND_ERROR)
      return <Redirect to="/session-not-found" />;

    else if (sessionInfo)
      return (
        <div>
          joining <span className="highlight">{sessionInfo.admin_name}</span>'s session.<br/>
          please choose your username.<br/>
          <br/>

          <form onSubmit={handleSubmitName}>
            <DefaultTextField
              placeholder="username"
              autofocus={true}
              value={username}
              onChange={updateField}
              error={props.error}
            />
            <br/>
            <Button type="submit" text="next"/>
          </form>
        </div>
      );

    // while sessionInfo is being fetched
    else return ""
  };

  const renderStageAuth = () => {
    return (
      <div>
        do you want to authorize spotify?<br/>
        if you don't do that you only can vote on songs.<br/>
        <br/>

        <Button style={{marginRight: '1em'}} type="text" text="authorize" onClick={redirectAuthorize}/>
        <Button type="submit" text="just vote" onClick={redirectPlayer}/>
      </div>
    )
  };

  switch (stage) {
    case STAGES.NAME:
      return renderStageName();
    case STAGES.AUTH:
      return renderStageAuth();
    default:
      return renderStageName();
  }
};

export default connect(
  state => ({
    user: state.user,
    isLogged: state.isLogged,
    sessionInfo: state.sessionInfo,
    error: state.error,
  })
)(JoinSessionForm);
