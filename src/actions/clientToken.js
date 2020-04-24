import FetchClientToken from "../services/backend/fetching/FetchClientToken";
import createAsyncThunk from "./helpers/createAsyncThunk";

export const SET_CLIENT_TOKEN = 'SET_CLIENT_TOKEN';
export const FETCH_CLIENT_TOKEN_FAILURE = 'FETCH_CLIENT_TOKEN_FAILURE';

export const fetchClientToken = user => {
  let serviceInstance = new FetchClientToken(user);
  return createAsyncThunk(
    serviceInstance,
    true,
    res => setClientToken(res.clientToken),
    res => fetchClientTokenFailure(res.error)
  );
};

export const clearClientToken = () => {
  return setClientToken(null);
};

const setClientToken = clientToken => ({
  type: SET_CLIENT_TOKEN,
  payload: clientToken,
  error: null
});

const fetchClientTokenFailure = error => ({
  type: FETCH_CLIENT_TOKEN_FAILURE,
  payload: null,
  error: error
});
