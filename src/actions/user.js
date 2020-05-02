import CreateSession from '../services/backend/user/CreateSession'
import JoinSession from "../services/backend/user/JoinSession";
import FetchAuthToken from "../services/backend/fetching/FetchAuthToken";
import createAsyncThunk from "./helpers/createAsyncThunk";
import EncoreAuth from "../services/backend/EncoreAuth";
import PlayerSynchronize from "../services/backend/user/PlayerSynchronize";
import LeaveSession from "../services/backend/user/LeaveSession";
import DeleteSession from "../services/backend/user/DeleteSession";
import FetchUserInfo from "../services/backend/fetching/FetchUserInfo";
import ReactGA from "react-ga";
import SetSyncMode from "../services/backend/user/SetSyncMode";

export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const CREATE_FAILURE = 'CREATE_FAILURE';
export const JOIN_SUCCESS = 'JOIN_SUCCESS';
export const JOIN_FAILURE = 'JOIN_FAILURE';
export const SET_USER = 'SET_USER';
export const LOG_OUT = 'LOG_OUT';
export const FETCH_USER_INFO_FAILURE = 'FETCH_USER_FAILURE';
export const LEAVE_SUCCESS = 'LEAVE_SUCCESS';
export const LEAVE_FAILURE = 'LEAVE_FAILURE';
export const DELETE_SESSION_SUCCESS = 'DELETE_SESSION_SUCCESS';
export const DELETE_SESSION_FAILURE = 'DELETE_SESSION_FAILURE';
export const FETCH_AUTH_TOKEN_SUCCESS = 'FETCH_AUTH_TOKEN_SUCCESS';
export const FETCH_AUTH_TOKEN_FAILURE = 'FETCH_AUTH_TOKEN_FAILURE';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const SET_SYNCHRONIZED = 'SET_SYNCHRONIZED';
export const SYNCHRONIZE_FAILURE = 'SYNCHRONIZE_FAILURE';

export const SET_SYNC_MODE_FAILURE = 'SET_SYNC_MODE_FAILURE';
export const SET_SYNC_MODE_SUCCESS = 'SET_SYNC_MODE_SUCCESS';

export const createSession = adminName => {
  ReactGA.event({
    category: 'User',
    action: 'createSession'
  });
  let serviceInstance = new CreateSession(adminName);
  return createAsyncThunk(
    serviceInstance,
    false,
    res => createSuccess(res.user),
    res => createFailure(res.error)
  );
};

export const joinSession = (username, sessionID) => {
  ReactGA.event({
    category: 'User',
    action: 'joinSession'
  });
  let serviceInstance = new JoinSession(username, sessionID);
  return createAsyncThunk(
    serviceInstance,
    false,
    res => joinSuccess(res.user),
    res => joinFailure(res.error)
  );
};

export const fetchUserInfo = (user) => {
  let serviceInstance = new FetchUserInfo(user);
  return createAsyncThunk(
    serviceInstance,
    true,
    res => setUser(res.user),
    res => fetchUserFailure(res.error)
  )
};

export const leaveSession = user => {
  ReactGA.event({
    category: 'User',
    action: 'leaveSession'
  });
  const serviceInstance = new LeaveSession(user);
  return createAsyncThunk(
    serviceInstance,
    false,
    _ => leaveSuccess(),
    res => leaveFailure(res.error)
  );
};

export const deleteSession = user => {
  ReactGA.event({
    category: 'User',
    action: 'deleteSession'
  });
  const serviceInstance = new DeleteSession(user);
  return createAsyncThunk(
    serviceInstance,
    false,
    _ => deleteSessionSuccess(),
    res => deleteSessionFailure(res.error)
  );
};

export const fetchAuthToken = user => {
  let serviceInstance = new FetchAuthToken(user);
  return createAsyncThunk(
    serviceInstance,
    true,
    res => fetchAuthTokenSuccess(res.user.authToken),
    res => fetchAuthTokenFailure(res.error)
  );
};

export const authenticate = user => {
  let serviceInstance = new EncoreAuth(user);
  return createAsyncThunk(
    serviceInstance,
    false,
    null,
    res => authFailure(res.error),
  );
};

export const setSyncMode = (user, syncMode) => {
  ReactGA.event({
    category: 'User',
    action: 'setSyncMode'
  });
  let serviceInstance = new SetSyncMode(user, syncMode);
  return createAsyncThunk(
    serviceInstance,
    true,
    res => setSyncModeSuccess(res.syncMode),
    res => setSyncModeFailure(res.error)
  );
};


export const synchronize = user => {
  ReactGA.event({
    category: 'User',
    action: 'synchronize'
  });
  let serviceInstance = new PlayerSynchronize(user);
  return createAsyncThunk(
    serviceInstance,
    true,
    null,
    res => synchronizeFailure(res.error)
  );
};

export const authFailure = error => ({
  type: AUTH_FAILURE,
  payload: null,
  error: error
});

// sets user to null, error to intialError and isLogged to false
export const logOut = () => ({
  type: LOG_OUT,
  payload: null,
  error: null,
});

const createSuccess = user => ({
  type: CREATE_SUCCESS,
  payload: user,
  error: null
});

const createFailure = error => ({
  type: CREATE_FAILURE,
  payload: null,
  error: error
});

const joinSuccess = user => ({
  type: JOIN_SUCCESS,
  payload: user,
  error: null
});

const joinFailure = error => ({
  type: JOIN_FAILURE,
  payload: null,
  error: error
});

const setUser = user => ({
  type: SET_USER,
  payload: user,
  error: null,
});

const fetchUserFailure = err => ({
  type: FETCH_USER_INFO_FAILURE,
  payload: err,
  error: err
});

const leaveSuccess = () => ({
  type: LEAVE_SUCCESS,
  payload: null,
  error: null
});

const leaveFailure = error => ({
  type: LEAVE_FAILURE,
  payload: null,
  error: error
});

const deleteSessionSuccess = () => ({
  type: DELETE_SESSION_SUCCESS,
  payload: null,
  error: null
});

const deleteSessionFailure = error => ({
  type: DELETE_SESSION_FAILURE,
  payload: null,
  error: error
});

const fetchAuthTokenSuccess = user => ({
  type: FETCH_AUTH_TOKEN_SUCCESS,
  payload: user,
  error: null
});

const fetchAuthTokenFailure = error => ({
  type: FETCH_AUTH_TOKEN_FAILURE,
  payload: null,
  error: error
});

export const setSynchronized = synchronized => ({
  type: SET_SYNCHRONIZED,
  payload: synchronized,
  error: null
});

const synchronizeFailure = error => ({
  type: SYNCHRONIZE_FAILURE,
  payload: null,
  error: error
});

const setSyncModeFailure = error => ({
  type: SET_SYNC_MODE_FAILURE,
  payload: null,
  error: error
});

const setSyncModeSuccess = syncMode => ({
  type: SET_SYNC_MODE_SUCCESS,
  payload: syncMode,
  error: null
});
