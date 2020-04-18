import FetchPlaylist from "../services/backend/fetching/FetchPlaylist";
import {STATUS_SUCCESS} from "../services/backend/constants";

export const REQUEST_PLAYLIST = 'REQUEST_PLAYLIST';
export const SET_PLAYLIST = 'SET_PLAYLIST';
export const FETCH_PLAYLIST_FAILURE = 'FETCH_PLAYLIST_FAILURE';

export const fetchPlaylist = user => {
  return dispatch => {
    dispatch(requestPlaylist());
    return new FetchPlaylist(user).perform()
      .then(res => {
        if (res._status === STATUS_SUCCESS)
          dispatch(setPlaylist(res.playlist));
        else
          dispatch(fetchPlaylistFailure(res.error));
      });
  };
};

const requestPlaylist = () => ({
  type: REQUEST_PLAYLIST,
  payload: null,
  error: null
});

export const setPlaylist = playlist => ({
  type: SET_PLAYLIST,
  payload: playlist,
  error: null
});

const fetchPlaylistFailure = error => ({
  type: FETCH_PLAYLIST_FAILURE,
  payload: null,
  error: error
});
