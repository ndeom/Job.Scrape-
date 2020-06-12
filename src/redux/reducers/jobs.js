import { REMOVE_JOB, UNREMOVE_JOB } from "../actionTypes";
import { RECEIVE_JOBS } from "../serviceTypes";

const initialState = {
  jobIds: [],
  jobsById: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_JOBS: {
      const { jobIds, jobsById } = action.payload;
      return {
        ...state,
        jobIds,
        jobsById,
      };
    }
    case REMOVE_JOB: {
      const { id } = action.payload;
      return {
        ...state,
        jobsById: {
          ...state.jobsById,
          [id]: {
            ...state.jobsById[id],
            displayed: false,
          },
        },
      };
    }
    case UNREMOVE_JOB:
      const { id } = action.payload;
      return {
        ...state,
        jobsById: {
          ...state.jobsById,
          [id]: {
            ...state.jobsById[id],
            displayed: true,
          },
        },
      };

    default:
      return state;
  }
}
