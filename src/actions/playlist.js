import FetchPlaylist from "../services/backend/fetching/FetchPlaylist";
import createAsyncThunk from "./helpers/createAsyncThunk";

export const SET_PLAYLIST = 'SET_PLAYLIST';
export const FETCH_PLAYLIST_FAILURE = 'FETCH_PLAYLIST_FAILURE';

export const fetchPlaylist = user => {
  let serviceInstance = new FetchPlaylist(user);
  return createAsyncThunk(
    serviceInstance,
    true,
    res => setPlaylist(res.playlist),
    res => fetchPlaylistFailure(res.error)
  );
};

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
