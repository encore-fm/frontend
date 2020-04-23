import createAsyncThunk from "./helpers/createAsyncThunk";
import FetchUserList from "../services/backend/fetching/FetchUserList";

export const REQUEST_USER_LIST = 'REQUEST_USER_LIST';
export const SET_USER_LIST = 'SET_USER_LIST';
export const FETCH_USER_LIST_FAILURE = 'FETCH_USER_LIST_FAILURE';

export const fetchUserList = user => {
  const serviceInstance = new FetchUserList(user);
  return createAsyncThunk(
    serviceInstance,
    () => requestUserList(),
    res => setUserList(res.userList),
    res => fetchUserListFailure(res.error)
  );
};

const requestUserList = () => ({
  type: REQUEST_USER_LIST,
  payload: null,
  error: null
});

export const setUserList = userList => ({
  type: SET_USER_LIST,
  payload: userList,
  error: null
});

const fetchUserListFailure = error => ({
  type: FETCH_USER_LIST_FAILURE,
  payload: null,
  error: error
});
