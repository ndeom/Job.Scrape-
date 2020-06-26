import fetch from "cross-fetch";

/* This function accepts two items: 1) an array, and 2) a key.
   The purpose of this function is to take an array of objects
   and convert it into an object with keys for each object of
   the array, with an added property of 'displayed' which
   indicates whether the job card will be displayed on the main
   tab. If displayed is true, it is on the main tab, if displayed
   is false, it is displayed on the removed tab. */

const arrToObj = (arr) => {
  let page = 1;
  return arr.reduce((accum, value, index) => {
    if (index !== 0 && index % 10 === 0) {
      page += 1;
    }
    accum[index] = { ...value, displayed: true, page: page };
    return accum;
  }, {});
};

export const REQUEST_JOBS = "GET_JOBS";

function requestJobs(params) {
  return {
    type: REQUEST_JOBS,
    payload: {
      jobsIds: [],
      jobsById: {},
      jobsLoading: true,
      query: true,
    },
  };
}

export const RECEIVE_JOBS = "RECEIVE_JOBS";

function receiveJobs(json) {
  return {
    type: RECEIVE_JOBS,
    payload: {
      jobIds: json.map((obj, i) => i),
      jobsById: arrToObj(json),
      jobsLoading: false,
      query: true,
    },
  };
}

export function fetchJobs(params) {
  return function (dispatch) {
    dispatch(requestJobs(params));

    if (params) {
      let url = "";
      if (params.keywords) {
        let keywords = params.keywords.trim().split(" ").join("+");
        url = url.concat(`keywords=${keywords}&`);
      }
      if (params.city) {
        let city = params.city.trim();
        url = url.concat(`city=${city}&`);
      }
      if (params.state) {
        let state = params.state.trim();
        url = url.concat(`state=${state}&`);
      }
      if (params.zipcode) {
        let zipcode = `${params.zipcode}`.trim();
        url = url.concat(`zipcode=${zipcode}&`);
      }
      if (params.tech && params.tech.length) {
        console.log("tech: ", params.tech);
        let tech = params.tech.map((el) => el.title).join("+");
        url = url.concat(`tech=${tech}&`);
      }
      if (params.skillLevel) {
        let skill = params.skillLevel;
        url = url.concat(`skill=${skill}`);
      }

      if (url.match(/&$/g)) {
        url = url.slice(0, url.length - 1);
      }

      return fetch(`http://localhost:8000/api?${url}`)
        .then((res) => res.json())
        .then((json) => dispatch(receiveJobs(json)));
    } else {
      return fetch("http://localhost:8000/api")
        .then((res) => res.json())
        .then((json) => dispatch(receiveJobs(json)));
    }
  };
}
