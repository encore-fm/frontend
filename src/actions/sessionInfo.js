import {STATUS_SUCCESS} from "../services/backend/constants";
import FetchSessionInfo from "../services/backend/fetching/FetchSessionInfo";

export const REQUEST_SESSION_INFO = 'REQUEST_SESSION_INFO';
export const FETCH_SESSION_INFO_SUCCESS = 'FETCH_SESSION_INFO_SUCCESS';
export const FETCH_SESSION_INFO_FAILURE = 'FETCH_SESSION_INFO_FAILURE';

export const fetchSessionInfo = sessionID => {
  return dispatch => {
    dispatch(requestSessionInfo());
    return new FetchSessionInfo(sessionID).perform()
      .then(res => {
        if (res.status === STATUS_SUCCESS)
          dispatch(fetchSessionInfoSuccess(res.sessionInfo));
        else
          dispatch(fetchSessionInfoFailure(res.error));
      });
  };
};

const requestSessionInfo = () => ({
  type: REQUEST_SESSION_INFO,
  payload: null,
  error: null
});

const fetchSessionInfoSuccess = sessionInfo => ({
  type: FETCH_SESSION_INFO_SUCCESS,
  payload: sessionInfo,
  error: null
});

const fetchSessionInfoFailure = error => ({
  type: FETCH_SESSION_INFO_FAILURE,
  payload: null,
  error: error
});
