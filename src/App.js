import React from "react";
import "./App.css";
import Form from "./components/Form";
import Results from "./components/Results";
import Tabs from "./components/Tabs";
import { setFilter } from "./redux/actions";
import { setPage } from "./redux/actions";
import { connect } from "react-redux";
import { getJobsIdList } from "./redux/selectors";
import { withStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

class App extends React.Component {
  constructor({ showTabs, pageCount, setFilter, setPage }) {
    super({ showTabs, pageCount, setFilter, setPage });
    this.state = {
      prevPageYOffset: 0,
      scrollUpVisible: false,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    const { prevPageYOffset } = this.state;
    const currentPageYOffset = window.pageYOffset;
    const scrollUpVisible = prevPageYOffset > currentPageYOffset;
    this.setState({ prevPageYOffset: currentPageYOffset, scrollUpVisible });
  }

  render() {
    return (
      <div className="App">
        <div id="headerContainer">
          <header id="appHeader">
            <div id="logo">
              <span id="abbrev">JS</span>
              <span id="title">Job.Scrape( )</span>
            </div>
            <nav>
              <ul className="nav-list">
                <li
                  className="nav-item"
                  onClick={() => this.props.setFilter("displayed")}
                >
                  Results
                </li>
                <li
                  className="nav-item"
                  onClick={() => this.props.setFilter("removed")}
                >
                  Favorited
                </li>
                <li
                  className="nav-item"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Search
                </li>
              </ul>
            </nav>
          </header>
        </div>

        <div className="bodyContainer">
          <Form />
          <Results />
        </div>
        <div
          className={`scroll-to-top ${
            this.state.scrollUpVisible ? "scroll-into-view" : ""
          }`}
        >
          <ArrowUpwardIcon
            classes={{ root: "scroll-arrow" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const showTabs =
    getJobsIdList(state) && getJobsIdList(state).length ? true : false;

  if (Object.keys(state.jobs.jobsById).length) {
    const jobIds = getJobsIdList(state);
    const lastIndex = jobIds[jobIds.length - 1];
    const pageCount = state.jobs.jobsById[lastIndex].page;
    return { showTabs, activeTab: state.tabFilter, pageCount };
  } else {
    return { showTabs, activeTab: state.tabFilter };
  }
};

export default connect(mapStateToProps, { setFilter, setPage })(App);
