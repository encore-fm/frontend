import SuggestSong from "../services/backend/activities/SuggestSong";
import createAsyncThunk from "./helpers/createAsyncThunk";

export const SUGGEST_SONG_FAILURE = 'SUGGEST_SONG_FAILURE';

export const suggestSong = (user, songID) => {
  let serviceInstace = new SuggestSong(user, songID);
  return createAsyncThunk(
    serviceInstace,
    false,
    null,
    res => suggestSongFailure(res.error)
  );
};

const suggestSongFailure = error => ({
  type: SUGGEST_SONG_FAILURE,
  payload: null,
  error: error
});
