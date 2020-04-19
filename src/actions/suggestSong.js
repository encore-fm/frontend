import SuggestSong from "../services/backend/activities/SuggestSong";
import createAsyncThunk from "./helpers/createAsyncThunk";

export const REQUEST_SUGGEST_SONG = 'REQUEST_SUGGEST_SONG';
export const SUGGEST_SONG_FAILURE = 'SUGGEST_SONG_FAILURE';

export const suggestSong = (user, songID) => {
  let serviceInstace = new SuggestSong(user, songID);
  return createAsyncThunk(
    serviceInstace,
    () => requestSuggestSong(),
    null,
    res => suggestSongFailure(res.error)
  );
};

const requestSuggestSong = () => ({
  type: REQUEST_SUGGEST_SONG,
  payload: null,
  error: null
});

const suggestSongFailure = error => ({
  type: SUGGEST_SONG_FAILURE,
  payload: null,
  error: error
});
