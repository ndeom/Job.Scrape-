import { TABS } from "./constants";

export const getJobsState = (store) => store.jobs;

export const getJobsIdList = (store) =>
  getJobsState(store) ? getJobsState(store).jobIds : [];

export const getJobById = (store, id) =>
  getJobsState(store) ? { ...getJobsState(store).jobsbyId[id], id } : {};

/* This selector retrieves the list of job id's from store, 
   iterates through the id's, and for each calls the getJobById 
   function/selector to retrieve the corresponding job object
   from the jobsById field. It then spreads the contents in a 
   new object and adds an id field with corresponding id. It
   returns a list/array of objects.*/

export const getJobs = (store) =>
  getJobsIdList(store).map((id) => getJobById(store, id));

/* This selector uses the getJobs selector to retrieve a list 
   of job objects and then filters them based on their 'displayed'
   field. */

export const getJobsByTab = (store, tab) => {
  const allJobs = getJobs(store);
  switch (tab) {
    case TABS.CURRENT:
      return allJobs.filter((job) => job.displayed);
    case TABS.REMOVED:
      return allJobs.filter((job) => !job.displayed);
    default:
      return allJobs;
  }
};
