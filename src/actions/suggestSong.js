import SuggestSong from "../services/backend/activities/SuggestSong";
import {STATUS_FAILURE} from "../services/backend/constants";

export const REQUEST_SUGGEST_SONG = 'REQUEST_SUGGEST_SONG';
export const SUGGEST_SONG_FAILURE = 'SUGGEST_SONG_FAILURE';

export const suggestSong = (user, songID) => {
  return dispatch => {
    dispatch(requestSuggestSong());
    return new SuggestSong(user, songID).perform()
      .then(res => {
        if (res.status === STATUS_FAILURE)
          dispatch(suggestSongFailure(res.error));
      });
  };
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
