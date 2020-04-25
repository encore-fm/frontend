import PlayerPlay from "../services/backend/player/PlayerPlay";
import PlayerPause from "../services/backend/player/PlayerPause";
import PlayerSkip from "../services/backend/player/PlayerSkip";
import PlayerSeek from "../services/backend/player/PlayerSeek";
import createAsyncThunk from "./helpers/createAsyncThunk";
import FetchPlayerState from "../services/backend/fetching/FetchPlayerState";
import ReactGA from "react-ga";

export const PLAYER_PLAY_FAILURE = 'PLAYER_PLAY_FAILURE';
export const PLAYER_PAUSE_FAILURE = 'PLAYER_PAUSE_FAILURE';
export const PLAYER_SKIP_FAILURE = 'PLAYER_SKIP_FAILURE';
export const PLAYER_SEEK_FAILURE = 'PLAYER_SEEK_FAILURE';
export const PLAYER_STATE_FAILURE = 'PLAYER_STATE_FAILURE';
export const SET_PLAYER_STATE = 'SET_PLAYER_STATE';

export const play = user => {
  ReactGA.event({
    category: 'Player',
    action: 'play'
  });

  let serviceInstance = new PlayerPlay(user);
  return createAsyncThunk(
    serviceInstance,
    false,
    null,
    res => playerPlayFailure(res.error),
  );
};

export const pause = user => {
  ReactGA.event({
    category: 'Player',
    action: 'pause'
  });

  let serviceInstance = new PlayerPause(user);
  return createAsyncThunk(
    serviceInstance,
    false,
    null,
    res => playerPauseFailure(res.error)
  );
};

export const skip = user => {
  ReactGA.event({
    category: 'Player',
    action: 'skip'
  });

  let serviceInstance = new PlayerSkip(user);
  return createAsyncThunk(
    serviceInstance,
    false,
    null,
    res => playerSkipFailure(res.error)
  );
};

export const seek = (user, positionMs) => {
  ReactGA.event({
    category: 'Player',
    action: 'seek'
  });

  let serviceInstance = new PlayerSeek(user, positionMs);
  return createAsyncThunk(
    serviceInstance,
    false,
    null,
    res => playerSeekFailure(res.error)
  );
};

export const initPlayerState = user => {
  let serviceInstance = new FetchPlayerState(user);
  return createAsyncThunk(
    serviceInstance,
    true,
    res => setPlayerState(res.playerState),
    res => requestPlayerStateFailure(res.error)
  );
};

export const setPlayerState = player => ({
  type: SET_PLAYER_STATE,
  payload: player,
  error: null
});

const playerPlayFailure = error => ({
  type: PLAYER_PLAY_FAILURE,
  payload: null,
  error: error
});

const playerPauseFailure = error => ({
  type: PLAYER_PAUSE_FAILURE,
  payload: null,
  error: error
});

const playerSkipFailure = error => ({
  type: PLAYER_SKIP_FAILURE,
  payload: null,
  error: error
});

const playerSeekFailure = error => ({
  type: PLAYER_SEEK_FAILURE,
  payload: null,
  error: error
});

const requestPlayerStateFailure = error => ({
  type: PLAYER_STATE_FAILURE,
  payload: null,
  error: error
});
