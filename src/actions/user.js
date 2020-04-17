import CreateSession from '../services/backend/user/CreateSession'
import {STATUS_SUCCESS} from "../services/backend/constants";
import JoinSession from "../services/backend/user/JoinSession";
import FetchAuthToken from "../services/backend/fetching/FetchAuthToken";

export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const CREATE_FAILURE = 'CREATE_FAILURE';
export const JOIN_SUCCESS = 'JOIN_SUCCESS';
export const JOIN_FAILURE = 'JOIN_FAILURE';
export const REQUEST_AUTH_TOKEN = 'REQUEST_AUTH_TOKEN';
export const FETCH_AUTH_TOKEN_SUCCESS = 'FETCH_AUTH_TOKEN_SUCCESS';
export const FETCH_AUTH_TOKEN_FAILURE = 'FETCH_AUTH_TOKEN_FAILURE';

export const createSession = adminName => {
  return dispatch => {
    return new CreateSession(adminName).perform()
      .then(res => {
        if (res.status === STATUS_SUCCESS)
          dispatch(createSuccess(res.user));
        else
          dispatch(createFailure(res.error))
      })
  }
};

export const joinSession = (username, sessionID) => {
  return dispatch => {
    return new JoinSession(username, sessionID).perform()
      .then(res => {
        if (res.status === STATUS_SUCCESS)
          dispatch(joinSuccess(res.user));
        else
          dispatch(joinFailure(res.error));
      })
  }
};

export const fetchAuthToken = user => {
  return dispatch => {
    dispatch(requestAuthToken());
    return new FetchAuthToken(user).perform()
      .then(res => {
        if (res.status === STATUS_SUCCESS)
          dispatch(fetchAuthTokenSuccess(res.user));
        else
          dispatch(fetchAuthTokenFailure(res.error));
      });
  };
};

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
