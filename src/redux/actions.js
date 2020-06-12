import * as actions from "./actionTypes.js";

export const removeJob = (id) => ({
  type: actions.REMOVE_JOB,
  payload: { id },
});

export const unremoveJob = (id) => ({
  type: actions.UNREMOVE_JOB,
  payload: { id },
});

export const setFilter = (tab) => ({
  type: actions.CHANGE_TAB,
  payload: { tab },
});
