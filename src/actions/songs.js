import {STATUS_SUCCESS} from "../services/backend/constants";
import FetchSongs from "../services/spotify/FetchSongs";

export const REQUEST_SONGS = 'REQUEST_SONGS';
export const SET_SONGS = 'SET_SONGS';
export const FETCH_SONGS_FAILURE = 'FETCH_SONGS_FAILURE';

export const fetchSongs = (query, token) => {
  return dispatch => {
    dispatch(requestSongs());
    return new FetchSongs(query, token).perform()
      .then(res => {
        if (res.status === STATUS_SUCCESS)
          dispatch(setSongs(res.results));
        else
          dispatch(fetchSongsFailure(res.error));
      });
  };
};

export const clearSongs = () => {
  return dispatch => {
    dispatch(setSongs([]));
  }
};

const requestSongs = () => ({
  type: REQUEST_SONGS,
  payload: null,
  error: null
});

const setSongs = results => ({
  type: SET_SONGS,
  payload: results,
  error: null
});

const fetchSongsFailure = error => ({
  type: FETCH_SONGS_FAILURE,
  payload: null,
  error: error
});
