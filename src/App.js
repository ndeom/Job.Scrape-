import React from "react";
import "./App.css";
import Form from "./components/Form";
import Results from "./components/Results";
import { setFilter } from "./redux/actions";
import { setPage } from "./redux/actions";
import { connect } from "react-redux";
import { getJobsIdList } from "./redux/selectors";

class App extends React.Component {
  constructor({ showTabs, activeTab, pageCount, setFilter, setPage }) {
    super({ showTabs, activeTab, pageCount, setFilter, setPage });
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
              <span id="logo-inner">
                <span id="abbrev">JS</span>
                <span id="title">Job.Scrape( )</span>
              </span>
            </div>
            <nav>
              <ul className="nav-list">
                <li
                  className={`nav-item ${
                    this.props.activeTab === "displayed" ? "active" : ""
                  }`}
                  onClick={() => this.props.setFilter("displayed")}
                >
                  Results
                </li>
                <li
                  className={`nav-item ${
                    this.props.activeTab === "removed" ? "active" : ""
                  }`}
                  onClick={() => this.props.setFilter("removed")}
                >
                  Favorited
                </li>
              </ul>
            </nav>
          </header>
        </div>

        <div className="bodyContainer">
          <Form />
          <Results />
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
