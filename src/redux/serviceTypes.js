import fetch from "cross-fetch";

/* This function accepts two items: 1) an array, and 2) a key.
   The purpose of this function is to take an array of objects
   and convert it into an object with keys for each object of
   the array, with an added property of 'displayed' which
   indicates whether the job card will be displayed on the main
   tab. If displayed is true, it is on the main tab, if displayed
   is false, it is displayed on the removed tab. */

const arrToObj = (arr) => {
  return arr.reduce((accum, value, index) => {
    accum[index] = { ...value, displayed: true };
    return accum;
  }, {});
};

export const REQUEST_JOBS = "GET_JOBS";

function requestJobs(params) {
  return {
    type: REQUEST_JOBS,
    params,
  };
}

export const RECEIVE_JOBS = "RECEIVE_JOBS";

function receiveJobs(json) {
  return {
    type: RECEIVE_JOBS,
    payload: {
      jobIds: json.map((obj, i) => i),
      jobsById: arrToObj(json),
    },
  };
}

export function fetchJobs(params) {
  return function (dispatch) {
    dispatch(requestJobs(params));

    return fetch(`/jobs?params=${params}`)
      .then((res) => res.json())
      .then((json) => dispatch(receiveJobs(json)));
  };
}
