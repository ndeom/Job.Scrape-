import { REMOVE_JOB, UNREMOVE_JOB } from "../actionTypes";
import { REQUEST_JOBS, RECEIVE_JOBS } from "../serviceTypes";

const initialState = {
  jobIds: [],
  jobsById: {},
  jobsLoading: false,
  query: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_JOBS: {
      const { jobIds, jobsById, jobsLoading, query } = action.payload;
      return {
        ...state,
        jobIds,
        jobsById,
        jobsLoading,
        query,
      };
    }
    case RECEIVE_JOBS: {
      const { jobIds, jobsById, jobsLoading, query } = action.payload;
      return {
        ...state,
        jobIds,
        jobsById,
        jobsLoading,
        query,
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
