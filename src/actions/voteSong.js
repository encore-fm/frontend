import VoteSong from "../services/backend/activities/VoteSong";
import createAsyncThunk from "./helpers/createAsyncThunk";

export const REQUEST_VOTE_SONG = 'REQUEST_VOTE_SONG';
export const VOTE_SONG_FAILURE = 'VOTE_SONG_FAILURE';

export const voteSong = (user, songID, voteAction) => {
  let serviceInstance = new VoteSong(user, songID, voteAction);
  return createAsyncThunk(
    serviceInstance,
    () => requestVoteSong(),
    null,
    res => voteSongFailure(res.error)
  );
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
