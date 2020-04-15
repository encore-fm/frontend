import {STATUS_SUCCESS} from "../services/backend/constants";
import FetchSongs from "../services/spotify/FetchSongs";

export const REQUEST_SONGS = 'REQUEST_SONGS';
export const FETCH_SONGS_SUCCESS = 'FETCH_SONGS_SUCCESS';
export const FETCH_SONGS_FAILURE = 'FETCH_SONGS_FAILURE';

export const fetchSongs = (query, token) => {
  return dispatch => {
    dispatch(requestSongs());
    return new FetchSongs(query, token).perform()
      .then(res => {
        if (res.status === STATUS_SUCCESS)
          dispatch(fetchSongsSuccess(res.results));
        else
          dispatch(fetchSongsFailure(res.error));
      });
  };
};

const requestSongs = () => ({
  type: REQUEST_SONGS,
  payload: null,
  error: null
});

const fetchSongsSuccess = results => ({
  type: FETCH_SONGS_SUCCESS,
  payload: results,
  error: null
});

const fetchSongsFailure = error => ({
  type: FETCH_SONGS_FAILURE,
  payload: null,
  error: error
});
