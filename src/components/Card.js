import React from "react";
import { connect } from "react-redux";
import { removeJob, unremoveJob } from "../redux/actions";
import Chip from "@material-ui/core/Chip";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import ScheduleOutlinedIcon from "@material-ui/icons/ScheduleOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "../styles/Card.css";

function Card({ currentTab, job, removeJob, unremoveJob }) {
  return (
    <div className="card grid-container">
      <img
        className="logo"
        src={
          job.logo
            ? job.logo
            : "http://cdn.sstatic.net/Sites/stackoverflow/img/favicon.ico?v=4f32ecc8f43d"
        }
        alt="logo"
      />
      <div className="job-title">
        {job.title.length <= 50
          ? job.title
          : job.title.slice(0, 49).concat("...")}
      </div>
      <div className="company-and-location">
        <div className="cl-inner">
          <div className="company">{job.company ? job.company : ""}</div>
          <div className="location-div">
            <LocationOnOutlinedIcon classes={{ root: "location-svg" }} />
            {job.location ? job.location : "Unavailable"}
          </div>
        </div>

        <div className="time-div">
          <ScheduleOutlinedIcon classes={{ root: "clock-svg" }} />
          {`${Math.round(
            (Date.now() - new Date(job.pub_date)) / 1000 / 60 / 60 / 24
          )} days ago`}
        </div>
      </div>
      <div className="vertical-rule"></div>
      <div className="technologies">
        {job.technologies !== "null" && job.technologies !== "undefined"
          ? job.technologies
              .split(",")
              .map((tech, i) =>
                tech !== "" ? <Chip className="chip" label={tech} /> : null
              )
          : null}
      </div>
      <div id="button-container">
        <a
          className="view-job-button"
          href={job.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Job
        </a>
        {currentTab === "displayed" ? (
          <React.Fragment>
            <div
              className={`favorite-button ${job.displayed ? "" : "active"}`}
              onClick={() =>
                job.displayed ? removeJob(job.id) : unremoveJob(job.id)
              }
            >
              <FavoriteIcon classes={{ root: "favorite-icon" }} />
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div
              className="unfavorite-button"
              onClick={() => unremoveJob(job.id)}
            >
              <FavoriteIcon classes={{ root: "favorite-icon" }} />
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentTab: state.tabFilter,
  };
};

export default connect(mapStateToProps, { removeJob, unremoveJob })(Card);
