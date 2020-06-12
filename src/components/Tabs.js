import React from "react";
import "../styles/Tabs.css";
import { setFilter } from "../redux/actions";
import { connect } from "react-redux";
import { getJobsIdList } from "../redux/selectors";

const Tabs = ({ showTabs, activeTab, setFilter }) => {
  return (
    <div id="tab-container">
      {showTabs ? (
        <React.Fragment>
          <div
            className="tab"
            id="displayed-tab"
            onClick={() => setFilter("displayed")}
          >
            Displayed
            <span
              className={`tab-indicator ${
                activeTab === "displayed" ? "active" : ""
              }`}
            ></span>
          </div>
          <div
            className="tab"
            id="removed-tab"
            onClick={() => setFilter("removed")}
          >
            Removed
            <span
              className={`tab-indicator ${
                activeTab === "removed" ? "active" : ""
              }`}
            ></span>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div></div>
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const showTabs =
    getJobsIdList(state) && getJobsIdList(state).length ? true : false;
  return { showTabs, activeTab: state.tabFilter };
};

export default connect(mapStateToProps, { setFilter })(Tabs);
