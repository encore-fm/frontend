import {FETCH_ERROR, STATUS_FAILURE} from "../constants";

// fetches the given request, handles errors and returns the given serviceInstance
export default (request, serviceInstance) => {
  return fetch(request)
    .then(res => {
      if (!res.ok) {
        serviceInstance.status = STATUS_FAILURE;
        return res.json()
          .then(err => serviceInstance.error = err)
          .then(() => serviceInstance);
      }
    }, err => {
      serviceInstance.status = STATUS_FAILURE;
      serviceInstance.error = FETCH_ERROR;
      return serviceInstance;
    });
};
