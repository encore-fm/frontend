import {FETCH_ERROR, STATUS_FAILURE} from "../constants";

// fetches the given request, passes the data through the given dataParser, updates the relevant fields in the
// given service instance and finally returns it.
export default (request, serviceInstance, dataParser) => {
  return fetch(request)
    .then(res => {
      if (res.ok)
        return res.json()
          .then(data => dataParser(data))
          .then(() => serviceInstance);
      else {
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
