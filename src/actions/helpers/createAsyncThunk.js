import {STATUS_SUCCESS} from "../../services/backend/constants";

// receives a service instance, an action to dispatch before fetching, at success and at failure
export default (serviceInstance, atRequest, atSuccess, atFailure) => {
  return dispatch => {
    if (atRequest) dispatch(atRequest());
    return serviceInstance.perform()
      .then(res => {
        if (res.status === STATUS_SUCCESS)
          if (atSuccess) dispatch(atSuccess(res));
        else
          if (atFailure) dispatch(atFailure(res))
      });
  }
}
