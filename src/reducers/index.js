import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistReducer } from 'redux-persist'

import error from "./error";
import user from "./user";
import isLogged from "./isLogged";
import playlist from "./playlist";
import userList from "./userList";
import songs from "./songs";
import isFetching from "./isFetching";
import clientToken from "./clientToken";
import sessionInfo from "./sessionInfo";
import player from "./player";
import menuOpen from "./menuOpen";

const rootReducer = combineReducers({
  isLogged,
  user,
  playlist,
  userList,
  songs,
  player,
  clientToken,
  sessionInfo,
  isFetching,
  menuOpen,
  error
});

export default persistReducer({
  key: 'root',
  storage: storage,
  whitelist: [
    'isLogged',
    'user',
  ]
}, rootReducer);
