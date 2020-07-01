import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchJobs } from "../redux/serviceTypes";
import { getJobsByTab } from "../redux/selectors";
import Card from "./Card";
import CardLoading from "./CardLoading";
import { withStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { setPage } from "../redux/actions";
import { getJobsIdList } from "../redux/selectors";

function Results({
  numberJobs,
  jobs,
  jobsLoading,
  currentPage,
  pageCount,
  query,
  currentTab,
  fetchJobs,
  setPage,
}) {
  //Used in place of ComponentDidMount()
  useEffect(() => {
    if (!jobsLoading && !query) {
      fetchJobs(null);
    }
  });

  const ThemedPagination = withStyles({
    root: {
      "&:hover": {
        color: "rgb(0, 255, 255)",
        transition: "color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
      selected: {
        "background-color": "#000a46",
      },
    },
  })(Pagination);

  return (
    <div id="results">
      <div id="results-label">
        <span>
          <b>{numberJobs}</b> jobs found
        </span>
      </div>
      <div id="results-container">
        {jobs && jobs.length ? (
          jobs.map((job, i) => {
            //console.log(job);
            return job.page === currentPage ? (
              <Card key={`job-${i}`} job={job} />
            ) : null;
          })
        ) : jobsLoading ? (
          [
            <CardLoading key={1} />,
            <CardLoading key={2} />,
            <CardLoading key={3} />,
            <CardLoading key={4} />,
            <CardLoading key={5} />,
            <CardLoading key={6} />,
          ]
        ) : currentTab === "displayed" ? (
          <div id="empty-search">
            Sorry, there weren't any results for your search.
          </div>
        ) : (
          <div id="empty-favorites">Favorites are empty.</div>
        )}
      </div>

      {pageCount && pageCount > 1 && currentTab !== "removed" ? (
        <div id="pagination-container">
          <ThemedPagination
            count={pageCount}
            color="primary"
            size="large"
            page={currentPage}
            hideNextButton={true}
            hidePrevButton={true}
            onChange={(e, page) => setPage(page)}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
        </div>
      ) : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  const currentPage = state.pageFilter;
  const numberJobs =
    state.jobs.jobIds && state.jobs.jobIds.length
      ? state.jobs.jobIds.length
      : 0;

  let props = {
    numberJobs,
    jobs: getJobsByTab(state, state.tabFilter),
    jobsLoading: state.jobs.jobsLoading,
    currentPage,
    query: state.jobs.query,
    currentTab: state.tabFilter,
  };

  if (Object.keys(state.jobs.jobsById).length) {
    const jobIds = getJobsIdList(state);
    const lastIndex = jobIds[jobIds.length - 1];
    const pageCount = state.jobs.jobsById[lastIndex].page;
    return { ...props, pageCount };
  } else {
    return props;
  }
};

export default connect(mapStateToProps, { fetchJobs, setPage })(Results);
