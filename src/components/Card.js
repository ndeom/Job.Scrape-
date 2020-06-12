import React from "react";
import { connect } from "react-redux";
import { removeJob, unremoveJob } from "../redux/actions";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Chip from "@material-ui/core/Chip";
import "../styles/Card.css";

function Card({ job, removeJob, unremoveJob }) {
  console.table({ job, removeJob, unremoveJob });
  return (
    <div className="card grid-container">
      {job.displayed ? (
        <React.Fragment>
          <IconButton
            id="remove-icon"
            aria-label="remove"
            onClick={() => removeJob(job.id)}
          >
            <DeleteIcon />
          </IconButton>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <IconButton
            id="remove-icon"
            aria-label="remove"
            onClick={() => unremoveJob(job.id)}
          >
            <AddCircleIcon />
          </IconButton>
        </React.Fragment>
      )}

      <div className="job-title">{job.title ? job.title : ""}</div>
      <div className="company-and-location">{`${
        job.company ? job.company : ""
      }, ${job.location ? job.location : ""}`}</div>
      <div className="job-description">
        {job.description ? job.description : ""}
      </div>
      <div className="technologies">
        {job.technologies
          ? job.technologies.map((tech) => <Chip label={tech} />)
          : null}
      </div>
      <div className="post-date">{job.time ? job.time : ""}</div>
    </div>
  );
}

export default connect(null, { removeJob, unremoveJob })(Card);
