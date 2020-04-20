import {REQUEST_PLAYLIST} from "../actions/playlist";
import {REQUEST_SONGS} from "../actions/songs";
import {REQUEST_AUTH_TOKEN, REQUEST_DESYNCHRONIZE, REQUEST_SYNCHRONIZE} from "../actions/user";
import {REQUEST_CLIENT_TOKEN} from "../actions/clientToken";
import {REQUEST_SUGGEST_SONG} from "../actions/suggestSong";
import {REQUEST_VOTE_SONG} from "../actions/voteSong";
import {
  REQUEST_PLAYER_PAUSE,
  REQUEST_PLAYER_PLAY,
  REQUEST_PLAYER_SEEK,
  REQUEST_PLAYER_SKIP,
  REQUEST_PLAYER_STATE
} from "../actions/player";

export default (state = false, action) => {
  switch (action.type) {
    case REQUEST_PLAYLIST:
    case REQUEST_SONGS:
    case REQUEST_AUTH_TOKEN:
    case REQUEST_CLIENT_TOKEN:
    case REQUEST_SUGGEST_SONG:
    case REQUEST_VOTE_SONG:
    case REQUEST_PLAYER_PLAY:
    case REQUEST_PLAYER_PAUSE:
    case REQUEST_PLAYER_SKIP:
    case REQUEST_PLAYER_SEEK:
    case REQUEST_PLAYER_STATE:
    case REQUEST_SYNCHRONIZE:
    case REQUEST_DESYNCHRONIZE:
      return true;
    default:
      return false;
  }
}
