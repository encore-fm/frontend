import FetchClientToken from "../services/backend/fetching/FetchClientToken";
import createAsyncThunk from "./helpers/createAsyncThunk";

export const REQUEST_CLIENT_TOKEN = 'REQUEST_CLIENT_TOKEN';
export const FETCH_CLIENT_TOKEN_SUCCESS = 'FETCH_CLIENT_TOKEN_SUCCESS';
export const FETCH_CLIENT_TOKEN_FAILURE = 'FETCH_CLIENT_TOKEN_FAILURE';

export const fetchClientToken = user => {
  let serviceInstance = new FetchClientToken(user);
  return createAsyncThunk(
    serviceInstance,
    () => requestClientToken(),
    res => fetchClientTokenSuccess(res.clientToken),
    res => fetchClientTokenFailure(res.error)
  );
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
