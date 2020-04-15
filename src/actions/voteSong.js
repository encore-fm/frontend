import {STATUS_FAILURE} from "../services/backend/constants";
import VoteSong from "../services/backend/VoteSong";

export const REQUEST_VOTE_SONG = 'REQUEST_VOTE_SONG';
export const VOTE_SONG_FAILURE = 'VOTE_SONG_FAILURE';

export const voteSong = (user, songID, voteAction) => {
  return dispatch => {
    dispatch(requestVoteSong());
    return new VoteSong(user, songID, voteAction).perform()
      .then(res => {
        if (res.status === STATUS_FAILURE)
          dispatch(voteSongFailure(res.error));
      });
  };
};

const requestVoteSong = () => ({
  type: REQUEST_VOTE_SONG,
  payload: null,
  error: null
});

const voteSongFailure = error => ({
  type: VOTE_SONG_FAILURE,
  payload: null,
  error: error
});
