import FetchClientToken from "../services/backend/fetching/FetchClientToken";
import {STATUS_SUCCESS} from "../services/backend/constants";

export const REQUEST_CLIENT_TOKEN = 'REQUEST_CLIENT_TOKEN';
export const FETCH_CLIENT_TOKEN_SUCCESS = 'FETCH_CLIENT_TOKEN_SUCCESS';
export const FETCH_CLIENT_TOKEN_FAILURE = 'FETCH_CLIENT_TOKEN_FAILURE';

export const fetchClientToken = user => {
  return dispatch => {
    dispatch(requestClientToken());
    return new FetchClientToken(user).perform()
      .then(res => {
        if (res.status === STATUS_SUCCESS)
          dispatch(fetchClientTokenSuccess(res.clientToken));
        else
          dispatch(fetchClientTokenFailure(res.error));
      });
  };
};

const requestClientToken = () => ({
  type: REQUEST_CLIENT_TOKEN,
  payload: null,
  error: null
});

const fetchClientTokenSuccess = clientToken => ({
  type: FETCH_CLIENT_TOKEN_SUCCESS,
  payload: clientToken,
  error: null
});

const fetchClientTokenFailure = error => ({
  type: FETCH_CLIENT_TOKEN_FAILURE,
  payload: null,
  error: error
});
