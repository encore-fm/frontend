import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import DefaultTextField from "../components/DefaultTextField";
import Button from "../components/Button";
import {joinSession} from "../actions/user";
import {useParams, useHistory} from "react-router-dom";
import {fetchSessionInfo} from "../actions/sessionInfo";


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
  }, []);

  useEffect(() => {
    if (!error.error) {
      if (isLogged || (stage === STAGES.NAME && sessionInfo && username)) {
        setStage(STAGES.AUTH);
      }
    }
  }, [user, error]);

  const redirectAuthorize = () => {
    if (isLogged) window.open(user.authUrl, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
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
    if (!sessionInfo) return "";
    else return (
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
    )
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
