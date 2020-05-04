import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import DefaultTextField from "../components/DefaultTextField";
import Button from "../components/Button";
import {deleteSession, fetchUserInfo, joinSession, leaveSession} from "../actions/user";
import {useParams, useHistory, Redirect} from "react-router-dom";
import {fetchSessionInfo} from "../actions/sessionInfo";
import {SESSION_NOT_FOUND_ERROR} from "../services/backend/constants";
import {fetchUserList} from "../actions/userList";


const STAGES = Object.freeze({
  INIT: 'INIT',
  NAME: 'NAME',
  AUTH: 'AUTH',
});

const getAdminName = (users) => {
  return users.filter(user => user.isAdmin === true)[0];
};

const JoinSessionForm = (props) => {
  const history = useHistory();
  const {sessionID} = useParams();
  const {user, isLogged, isFetching, error, sessionInfo, userList} = props;

  const [username, setUsername] = useState('');
  const [stage, setStage] = useState(STAGES.INIT);

  useEffect(() => {
    props.dispatch(fetchSessionInfo(sessionID));
    if (user) {
      props.dispatch(fetchUserInfo(user));
      props.dispatch(fetchUserList(user));
    }
  }, []);

  useEffect(() => {
    if (!error.error) {
      if ((stage === STAGES.NAME && sessionInfo && username)) {
        setStage(STAGES.AUTH);
      }
    }
  }, [user, error]);

  const redirectAuthorize = () => {
    if (isLogged) {
      window.open(user.authUrl, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
      // history.push('/player');
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

  const handleJoinNewSession = () => {
    if (user.isAdmin) {
      if (window.confirm('You are admin of the current session.\nIf you join the new session your current session will be deleted')) {
        props.dispatch(deleteSession(user));
      }
    } else {
      props.dispatch(leaveSession(user));
    }
    setStage(STAGES.NAME);
    setUsername('');
  };

  const renderStageName = () => {
    // only redirect if we know the session isn't valid
    // !sessionInfo doesn't suffice since the request to fetch the session info is asynchronous.
    if (error.error === SESSION_NOT_FOUND_ERROR)
      return <Redirect to="/session-not-found"/>;

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

  const renderStageInit = () => {
    if (user && sessionID === user.sessionID) return <Redirect to='/player' />;

    if (user && sessionInfo && userList && userList.length > 0) {
      return (
        <div>
          you are currently in <span className="highlight">{getAdminName(userList).username}</span>'s session.<br/>
          do you want to join <span className="highlight">{sessionInfo.admin_name}</span>'s session?<br/>
          <br/>
          <Button style={{marginRight: '1em'}} type="text" text="stay" onClick={redirectPlayer}/>
          <Button type="submit" text="join new" onClick={handleJoinNewSession}/>
        </div>
      )
    }

    if (!user) setStage(STAGES.NAME);
    return ""
  };

  if (!user && isFetching) return "";

  switch (stage) {
    case STAGES.INIT:
      return renderStageInit();
    case STAGES.NAME:
      return renderStageName();
    case STAGES.AUTH:
      return renderStageAuth();
    default:
      return renderStageInit();
  }
};

export default connect(
  state => ({
    user: state.user,
    isLogged: state.isLogged,
    sessionInfo: state.sessionInfo,
    isFetching: state.isFetching,
    userList: state.userList,
    error: state.error,
  })
)(JoinSessionForm);
