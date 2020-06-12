import React from "react";
import "./App.css";
import Form from "./components/Form";
import Results from "./components/Results";
import Tabs from "./components/Tabs";

function App() {
  return (
    <div className="App">
      <div className="headerFormContainer">
        <header id="appHeader">
          <h1>Job.Scrape( )</h1>
        </header>
        <Form />
      </div>
      <Tabs />
      <Results />
    </div>
  );
}

export default App;
