import PlayerPlay from "../services/backend/player/PlayerPlay";
import PlayerPause from "../services/backend/player/PlayerPause";
import PlayerSkip from "../services/backend/player/PlayerSkip";
import PlayerSeek from "../services/backend/player/PlayerSeek";
import createAsyncThunk from "./helpers/createAsyncThunk";
import FetchPlayerState from "../services/backend/fetching/FetchPlayerState";

export const REQUEST_PLAYER_PLAY = 'REQUEST_PLAYER_PLAY';
export const PLAYER_PLAY_FAILURE = 'PLAYER_PLAY_FAILURE';

export const REQUEST_PLAYER_PAUSE = 'REQUEST_PLAYER_PAUSE';
export const PLAYER_PAUSE_FAILURE = 'PLAYER_PAUSE_FAILURE';

export const REQUEST_PLAYER_SKIP = 'REQUEST_PLAYER_SKIP';
export const PLAYER_SKIP_FAILURE = 'PLAYER_SKIP_FAILURE';

export const REQUEST_PLAYER_SEEK = 'REQUEST_PLAYER_SEEK';
export const PLAYER_SEEK_FAILURE = 'PLAYER_SEEK_FAILURE';

export const REQUEST_PLAYER_STATE = 'REQUEST_PLAYER_STATE';
export const PLAYER_STATE_FAILURE = 'PLAYER_STATE_FAILURE';


export const SET_PLAYER_STATE = 'SET_PLAYER_STATE';

export const play = user => {
  let serviceInstance = new PlayerPlay(user);
  return createAsyncThunk(
    serviceInstance,
    () => requestPlayerPlay(),
    null,
    res => playerPlayFailure(res.error)
  );
};

export const pause = user => {
  let serviceInstance = new PlayerPause(user);
  return createAsyncThunk(
    serviceInstance,
    () => requestPlayerPause(),
    null,
    res => playerPauseFailure(res.error)
  );
};

export const skip = user => {
  let serviceInstance = new PlayerSkip(user);
  return createAsyncThunk(
    serviceInstance,
    () => requestPlayerSkip(),
    null,
    res => playerSkipFailure(res.error)
  );
};

export const seek = (user, positionMs) => {
  let serviceInstance = new PlayerSeek(user, positionMs);
  return createAsyncThunk(
    serviceInstance,
    () => requestPlayerSeek(),
    null,
    res => playerSeekFailure(res.error)
  );
};

export const initPlayerState = user => {
  let serviceInstance = new FetchPlayerState(user);
  return createAsyncThunk(
    serviceInstance,
    () => requestPlayerState(),
    res => setPlayerState(res.playerState),
    res => requestPlayerStateFailure(res.error)
  );
};

export const setPlayerState = player => ({
  type: SET_PLAYER_STATE,
  payload: player,
  error: null
});

const requestPlayerPlay = () => ({
  type: REQUEST_PLAYER_PLAY,
  payload: null,
  error: null
});

const playerPlayFailure = error => ({
  type: PLAYER_PLAY_FAILURE,
  payload: null,
  error: error
});

const requestPlayerPause = () => ({
  type: REQUEST_PLAYER_PAUSE,
  payload: null,
  error: null
});

const playerPauseFailure = error => ({
  type: PLAYER_PAUSE_FAILURE,
  payload: null,
  error: error
});
const requestPlayerSkip = () => ({
  type: REQUEST_PLAYER_SKIP,
  payload: null,
  error: null
});

const playerSkipFailure = error => ({
  type: PLAYER_SKIP_FAILURE,
  payload: null,
  error: error
});

const requestPlayerSeek = () => ({
  type: REQUEST_PLAYER_SEEK,
  payload: null,
  error: null
});

const playerSeekFailure = error => ({
  type: PLAYER_SEEK_FAILURE,
  payload: null,
  error: error
});

const requestPlayerState = () => ({
  type: REQUEST_PLAYER_STATE,
  payload: null,
  error: null
});

const requestPlayerStateFailure = error => ({
  type: PLAYER_STATE_FAILURE,
  payload: null,
  error: error
});
