import VoteSong from "../services/backend/activities/VoteSong";
import createAsyncThunk from "./helpers/createAsyncThunk";
import ReactGA from "react-ga";

export const VOTE_SONG_FAILURE = 'VOTE_SONG_FAILURE';

export const voteSong = (user, songID, voteAction) => {
  ReactGA.event({
    category: 'User',
    action: `vote_${voteAction}`
  });
  let serviceInstance = new VoteSong(user, songID, voteAction);
  return createAsyncThunk(
    serviceInstance,
    false,
    null,
    res => voteSongFailure(res.error)
  );
};

const voteSongFailure = error => ({
  type: VOTE_SONG_FAILURE,
  payload: null,
  error: error
});
