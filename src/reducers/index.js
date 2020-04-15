import {combineReducers} from "redux";
import error from "./error";
import user from "./user";
import isLogged from "./isLogged";
import playlist from "./playlist";
import songs from "./songs";
import isFetching from "./isFetching";
import clientToken from "./clientToken";

// todo: think about using redux persist
export const rootReducer = combineReducers({
  isLogged,
  user,
  playlist,
  songs,
  clientToken,
  isFetching,
  error
});
