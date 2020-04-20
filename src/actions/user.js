import CreateSession from '../services/backend/user/CreateSession'
import JoinSession from "../services/backend/user/JoinSession";
import FetchAuthToken from "../services/backend/fetching/FetchAuthToken";
import createAsyncThunk from "./helpers/createAsyncThunk";
import EncoreAuth from "../services/backend/EncoreAuth";
import PlayerPlay from "../services/backend/player/PlayerPlay";
import PlayerSynchronize from "../services/backend/user/PlayerSynchronize";
import {PLAYER_PLAY_FAILURE, REQUEST_PLAYER_PLAY} from "./player";
import PlayerDesynchronize from "../services/backend/user/PlayerDesynchronize";

export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const CREATE_FAILURE = 'CREATE_FAILURE';
export const JOIN_SUCCESS = 'JOIN_SUCCESS';
export const JOIN_FAILURE = 'JOIN_FAILURE';
export const REQUEST_AUTH_TOKEN = 'REQUEST_AUTH_TOKEN';
export const FETCH_AUTH_TOKEN_SUCCESS = 'FETCH_AUTH_TOKEN_SUCCESS';
export const FETCH_AUTH_TOKEN_FAILURE = 'FETCH_AUTH_TOKEN_FAILURE';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const REQUEST_SYNCHRONIZE = 'REQUEST_SYNCHRONIZE';
export const SYNCHRONIZE_FAILURE = 'SYNCHRONIZE_FAILURE';

export const REQUEST_DESYNCHRONIZE = 'REQUEST_DESYNCHRONIZE';
export const DESYNCHRONIZE_FAILURE = 'DESYNCHRONIZE_FAILURE';

export const createSession = adminName => {
  let serviceInstance = new CreateSession(adminName);
  return createAsyncThunk(
    serviceInstance,
    null,
    res => createSuccess(res.user),
    res => createFailure(res.error)
  );
};

export const joinSession = (username, sessionID) => {
  let serviceInstance = new JoinSession(username, sessionID);
  return createAsyncThunk(
    serviceInstance,
    null,
    res => joinSuccess(res.user),
    res => joinFailure(res.error)
  );
};

export const fetchAuthToken = user => {
  let serviceInstance = new FetchAuthToken(user);
  return createAsyncThunk(
    serviceInstance,
    () => requestAuthToken(),
    res => fetchAuthTokenSuccess(res.user.authToken),
    res => fetchAuthTokenFailure(res.error)
  );
};

export const authenticate = user => {
  let serviceInstance = new EncoreAuth(user);
  return createAsyncThunk(
    serviceInstance,
    null,
    null,
    res => authFailure(res.error),
  );
};

export const synchronize = user => {
  let serviceInstance = new PlayerSynchronize(user);
  return createAsyncThunk(
    serviceInstance,
    () => requestSynchronize(),
    null,
    res => synchronizeFailure(res.error)
  );
};

export const desynchronize = user => {
  let serviceInstance = new PlayerDesynchronize(user);
  return createAsyncThunk(
    serviceInstance,
    () => requestDesynchronize(),
    null,
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

const requestAuthToken = () => ({
  type: REQUEST_AUTH_TOKEN,
  payload: null,
  error: null
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

const requestSynchronize = () => ({
  type: REQUEST_SYNCHRONIZE,
  payload: null,
  error: null
});

const synchronizeFailure = error => ({
  type: SYNCHRONIZE_FAILURE,
  payload: null,
  error: error
});

const requestDesynchronize = () => ({
  type: REQUEST_DESYNCHRONIZE,
  payload: null,
  error: null
});

const desynchronizeFailure = error => ({
  type: DESYNCHRONIZE_FAILURE,
  payload: null,
  error: error
});