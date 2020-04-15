import SuggestSong from "../services/backend/SuggestSong";
import {STATUS_FAILURE} from "../services/backend/constants";

export const REQUEST_SUGGEST_SONG = 'REQUEST_SUGGEST_SONG';
export const SUGGEST_SONG_FAILED = 'SUGGEST_SONG_FAILED';

export const suggestSong = (user, songID) => {
  return dispatch => {
    dispatch(requestSuggestSong());
    return new SuggestSong(user, songID).perform()
      .then(res => {
        if (res.status === STATUS_FAILURE)
          dispatch(suggestSongFailed(res.error));
      });
  };
};

const requestSuggestSong = () => ({
  type: REQUEST_SUGGEST_SONG,
  payload: null,
  error: null
});

const suggestSongFailed = error => ({
  type: SUGGEST_SONG_FAILED,
  payload: null,
  error: error
});
