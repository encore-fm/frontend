import {STATUS_SUCCESS, STATUS_UNAUTHORIZED} from "../../services/backend/constants";
import {authFailure} from "../user";
import {setFetching} from "../isFetching";

// receives a service instance, an action to dispatch before fetching, at success and at failure
// and optionally when user isn't authorized
export default (
  serviceInstance,
  setFetch, // whether or not to set the fetching flag in the redux state, defaults to true
  atSuccess,
  atFailure,
  atUnauthorized = res => authFailure(res.error), // dispatch an authFailure per default. Only needs to overridden for Spotify requests
) => {
  return dispatch => {
    // action to dispatch when request is made
    if (setFetch) dispatch(setFetching());
    return serviceInstance.perform()
      .then(res => {
        if (res.status === STATUS_SUCCESS) {
          if (atSuccess) dispatch(atSuccess(res));
        } else if (res.status === STATUS_UNAUTHORIZED) {
          if (atUnauthorized) dispatch(atUnauthorized(res));
        } else
            if (atFailure) dispatch(atFailure(res));
        return res;
      });
  }
}
