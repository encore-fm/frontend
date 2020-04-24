import CreateSession from '../services/backend/user/CreateSession'
import JoinSession from "../services/backend/user/JoinSession";
import FetchAuthToken from "../services/backend/fetching/FetchAuthToken";
import createAsyncThunk from "./helpers/createAsyncThunk";
import EncoreAuth from "../services/backend/EncoreAuth";
import PlayerSynchronize from "../services/backend/user/PlayerSynchronize";
import PlayerDesynchronize from "../services/backend/user/PlayerDesynchronize";
import LeaveSession from "../services/backend/user/LeaveSession";
import DeleteSession from "../services/backend/user/DeleteSession";
import FetchUserInfo from "../services/backend/fetching/FetchUserInfo";

export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const CREATE_FAILURE = 'CREATE_FAILURE';
export const JOIN_SUCCESS = 'JOIN_SUCCESS';
export const JOIN_FAILURE = 'JOIN_FAILURE';
export const SET_USER = 'SET_USER';
export const FETCH_USER_INFO_FAILURE = 'FETCH_USER_FAILURE';
export const LEAVE_SUCCESS = 'LEAVE_SUCCESS';
export const LEAVE_FAILURE = 'LEAVE_FAILURE';
export const DELETE_SESSION_SUCCESS = 'DELETE_SESSION_SUCCESS';
export const DELETE_SESSION_FAILURE = 'DELETE_SESSION_FAILURE';
export const FETCH_AUTH_TOKEN_SUCCESS = 'FETCH_AUTH_TOKEN_SUCCESS';
export const FETCH_AUTH_TOKEN_FAILURE = 'FETCH_AUTH_TOKEN_FAILURE';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const SYNCHRONIZE_SUCCESS = 'SYNCHRONIZE_SUCCESS';
export const SYNCHRONIZE_FAILURE = 'SYNCHRONIZE_FAILURE';

export const DESYNCHRONIZE_FAILURE = 'DESYNCHRONIZE_FAILURE';

export const createSession = adminName => {
  let serviceInstance = new CreateSession(adminName);
  return createAsyncThunk(
    serviceInstance,
    false,
    res => createSuccess(res.user),
    res => createFailure(res.error)
  );
};

export const joinSession = (username, sessionID) => {
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
  const serviceInstance = new LeaveSession(user);
  return createAsyncThunk(
    serviceInstance,
    false,
    _ => leaveSuccess(),
    res => leaveFailure(res.error)
  );
};

export const deleteSession = user => {
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

export const synchronize = user => {
  let serviceInstance = new PlayerSynchronize(user);
  return createAsyncThunk(
    serviceInstance,
    true,
    res => synchronizeSuccess(res.synchronized),
    res => synchronizeFailure(res.error)
  );
};

export const desynchronize = user => {
  let serviceInstance = new PlayerDesynchronize(user);
  return createAsyncThunk(
    serviceInstance,
    false,
    res => synchronizeSuccess(res.synchronized),
    res => desynchronizeFailure(res.error)
  );
};

export const authFailure = error => ({
  type: AUTH_FAILURE,
  payload: null,
  error: error
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

const synchronizeSuccess = synchronized => ({
  type: SYNCHRONIZE_SUCCESS,
  payload: synchronized,
  error: null
});

const synchronizeFailure = error => ({
  type: SYNCHRONIZE_FAILURE,
  payload: null,
  error: error
});

const desynchronizeFailure = error => ({
  type: DESYNCHRONIZE_FAILURE,
  payload: null,
  error: error
});
