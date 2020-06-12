import React from "react";
import { connect } from "react-redux";
import { getJobsByTab } from "../redux/selectors";
import Card from "./Card";

function Results({ jobs }) {
  return (
    <div id="results-container">
      {jobs && jobs.length
        ? jobs.map((job, i) => <Card key={`job-${i}`} job={job} />)
        : ""}
    </div>
  );
}

const mapStateToProps = (state) => {
  return getJobsByTab(state, state.tabFilter);
};

export default connect(mapStateToProps)(Results);
