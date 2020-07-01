import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AutoComplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { options } from "./options.js";
import { connect } from "react-redux";
import { fetchJobs } from "../redux/serviceTypes";
import "../App.css";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: "",
      city: "",
      state: "",
      zipcode: "",
      tech: [],
      skillLevel: "",
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleAutoComplete = this.handleAutoComplete.bind(this);
    this.handleFetchJobs = this.handleFetchJobs.bind(this);
  }

  handleInput(e) {
    console.log({ [e.target.name]: e.target.value });
    this.setState({ [e.target.name]: e.target.value });
  }

  handleAutoComplete(value) {
    console.log("VALUE: ", ...value);
    this.setState({ tech: value }, () =>
      console.log("TECH: ", this.state.tech)
    );
  }

  handleFetchJobs() {
    console.log("Fetching jobs...");
    this.props.fetchJobs({ ...this.state });
    this.setState({
      keywords: "",
      city: "",
      state: "",
      zipcode: "",
      tech: [],
      skillLevel: "",
    });
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: { main: "#1c56ac" },
      },
      typography: {
        fontFamily: `"Noto Sans JP", sans-serif`,
        fontSize: "14px",
      },
    });

    return (
      <div id="formContainer">
        <form id="inputForm">
          <div id="form-col-1">
            <div className="textFieldRow">
              <ThemeProvider theme={theme}>
                <TextField
                  classes={{ root: "keywords-text-field" }}
                  id="roleKeyField"
                  name="keywords"
                  label="Keywords"
                  variant="outlined"
                  onChange={(e) => this.handleInput(e)}
                  value={this.state.keywords}
                />
              </ThemeProvider>
              <TextField
                classes={{ root: "location-text-field" }}
                id="cityField"
                name="city"
                label="Location"
                variant="outlined"
                onChange={(e) => this.handleInput(e)}
                value={this.state.city}
              />
            </div>
            <div className="textFieldRow">
              <AutoComplete
                multiple
                classes={{ root: "autocomplete" }}
                id="tech-autocomplete"
                name="tech"
                onChange={(event, value) => this.handleAutoComplete(value)}
                options={options}
                fullWidth={true}
                getOptionLabel={(options) => options.title}
                renderInput={(params) => (
                  <TextField {...params} label="Tech" variant="outlined" />
                )}
              />
              <FormControl
                classes={{ root: "skill-select" }}
                variant="outlined"
              >
                <InputLabel id="skill-select-label">Skill Level</InputLabel>
                <Select
                  labelId="skill-select-label"
                  id="skill-select"
                  name="skillLevel"
                  label="Experience Level"
                  onChange={this.handleInput}
                  value={this.state.skillLevel}
                >
                  <MenuItem value={"Beginner"}>Beginner</MenuItem>
                  <MenuItem value={"Intermediate"}>Intermediate</MenuItem>
                  <MenuItem value={"Experienced"}>Experienced</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div id="form-col-2">
            <Button
              classes={{ root: "submit-button" }}
              id="submit-button"
              variant="contained"
              color="primary"
              onClick={this.handleFetchJobs}
            >
              Search
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const numberJobs =
    state.jobs.jobIds && state.jobs.jobIds.length
      ? state.jobs.jobIds.length
      : 0;
  return { numberJobs };
};

export default connect(mapStateToProps, { fetchJobs })(Form);
