import {FETCH_ERROR, STATUS_FAILURE, STATUS_SUCCESS, STATUS_UNAUTHORIZED} from "../constants";

// fetches the given request, handles errors and returns the given serviceInstance
export default (request, serviceInstance) => {
  return fetch(request)
    .then(res => {
      if (res.ok) {
        serviceInstance.error = null;
        serviceInstance.status = STATUS_SUCCESS;
        return serviceInstance;
        // user is unauthorized
      } else if (res.status === 401) {
        serviceInstance.status = STATUS_UNAUTHORIZED;
        return res.json()
          .then(err => serviceInstance.error = err)
          .then(() => serviceInstance)
      } else {
        serviceInstance.status = STATUS_FAILURE;
        return res.json()
          .then(err => serviceInstance.error = err)
          .then(() => serviceInstance);
      }
    }, err => {
      // at promise rejection
      serviceInstance.status = STATUS_FAILURE;
      serviceInstance.error = FETCH_ERROR;
      return serviceInstance;
    });
};
