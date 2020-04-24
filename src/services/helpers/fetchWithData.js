import {FETCH_ERROR, STATUS_FAILURE, STATUS_UNAUTHORIZED} from "../backend/constants";

// fetches the given request, passes the data through the given dataParser, updates the relevant fields in the
// given service instance and finally returns it.
export default (request, serviceInstance, dataParser) => {
  return fetch(request)
    .then(res => {
      if (res.ok) {
        return res.json()
          .then(data => dataParser(data))
          .then(() => serviceInstance);
      }
      // user is unauthorized
      else if (res.status === 401) {
        serviceInstance.status = STATUS_UNAUTHORIZED;
        return res.json()
          .then(err => serviceInstance.error = err)
          .then(() => serviceInstance);
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
