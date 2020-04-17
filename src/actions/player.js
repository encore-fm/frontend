import PlayerPlay from "../services/backend/player/PlayerPlay";
import {STATUS_FAILURE} from "../services/backend/constants";
import PlayerPause from "../services/backend/player/PlayerPause";
import PlayerSkip from "../services/backend/player/PlayerSkip";
import PlayerSeek from "../services/backend/player/PlayerSeek";

export const REQUEST_PLAYER_PLAY = 'REQUEST_PLAYER_PLAY';
export const PLAYER_PLAY_FAILURE = 'PLAYER_PLAY_FAILURE';

export const REQUEST_PLAYER_PAUSE = 'REQUEST_PLAYER_PAUSE';
export const PLAYER_PAUSE_FAILURE = 'PLAYER_PAUSE_FAILURE';

export const REQUEST_PLAYER_SKIP = 'REQUEST_PLAYER_SKIP';
export const PLAYER_SKIP_FAILURE = 'PLAYER_SKIP_FAILURE';

export const REQUEST_PLAYER_SEEK = 'REQUEST_PLAYER_SEEK';
export const PLAYER_SEEK_FAILURE = 'PLAYER_SEEK_FAILURE';

export const SET_PLAYER_STATE = 'SET_PLAYER_STATE';

export const play = user => {
  return dispatch => {
    dispatch(requestPlayerPlay());
    return new PlayerPlay(user).perform()
      .then(res => {
        if (res.status === STATUS_FAILURE)
          dispatch(playerPlayFailure(res.error));
      });
  };
};

export const pause = user => {
  return dispatch => {
    dispatch(requestPlayerPause());
    return new PlayerPause(user).perform()
      .then(res => {
        if (res.status === STATUS_FAILURE)
          dispatch(playerPauseFailure(res.error));
      });
  };
};

export const skip = user => {
  return dispatch => {
    dispatch(requestPlayerSkip());
    return new PlayerSkip(user).perform()
      .then(res => {
        if (res.status === STATUS_FAILURE)
          dispatch(playerSkipFailure(res.error));
      });
  };
};

export const seek = (user, positionMs) => {
  return dispatch => {
    dispatch(requestPlayerSeek());
    return new PlayerSeek(user, positionMs).perform()
      .then(res => {
        if (res.status === STATUS_FAILURE)
          dispatch(playerSeekFailure(res.error));
      });
  };
};

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

export const setPlayerState = player => ({
  type: SET_PLAYER_STATE,
  payload: player,
  error: null
});
