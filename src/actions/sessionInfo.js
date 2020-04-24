import FetchSessionInfo from "../services/backend/fetching/FetchSessionInfo";
import createAsyncThunk from "./helpers/createAsyncThunk";

export const FETCH_SESSION_INFO_SUCCESS = 'FETCH_SESSION_INFO_SUCCESS';
export const FETCH_SESSION_INFO_FAILURE = 'FETCH_SESSION_INFO_FAILURE';

export const fetchSessionInfo = sessionID => {
  let serviceInstance = new FetchSessionInfo(sessionID);
  return createAsyncThunk(
    serviceInstance,
    true,
    res => fetchSessionInfoSuccess(res.sessionInfo),
    res => fetchSessionInfoFailure(res.error)
  );
};

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
