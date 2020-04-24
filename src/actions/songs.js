import FetchSongs from "../services/spotify/FetchSongs";
import createAsyncThunk from "./helpers/createAsyncThunk";
import {clearClientToken} from "./clientToken";

export const SET_SONGS = 'SET_SONGS';
export const FETCH_SONGS_FAILURE = 'FETCH_SONGS_FAILURE';

export const fetchSongs = (query, token) => {
  let serviceInstance = new FetchSongs(query, token);
  return createAsyncThunk(
    serviceInstance,
    true,
    res => setSongs(res.results),
    res => fetchSongsFailure(res.error),
    _ => clearClientToken()
  );
};

export const clearSongs = () => {
  return setSongs([]);
};

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
