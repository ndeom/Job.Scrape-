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
    this.handleFetchJobs = this.handleFetchJobs.bind(this);
  }

  handleInput(e) {
    console.log({ [e.target.name]: e.target.value });
    this.setState({ [e.target.name]: e.target.value });
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
        primary: { main: "#2867b2" },
      },
    });

    return (
      <form id="inputForm">
        <div className="textFieldRow">
          <ThemeProvider theme={theme}>
            <TextField
              id="roleKeyField"
              name="keywords"
              label="Role / Keywords"
              variant="outlined"
              onChange={this.handleInput}
              value={this.state.keywords}
            />
          </ThemeProvider>
          <TextField
            id="cityField"
            name="city"
            label="City"
            variant="outlined"
            onChange={this.handleInput}
            value={this.state.city}
          />
          <TextField
            id="stateField"
            name="state"
            label="State"
            variant="outlined"
            onChange={this.handleInput}
            value={this.state.state}
          />
          <TextField
            id="zipField"
            name="zipcode"
            label="Zipcode"
            variant="outlined"
            onChange={this.handleInput}
            value={this.state.zipcode}
          />
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleFetchJobs}
            >
              Search
            </Button>
          </ThemeProvider>
        </div>
        <div className="textFieldRow">
          <AutoComplete
            multiple
            id="tech-autocomplete"
            name="tech"
            onChange={this.handleInput}
            value={this.state.tech}
            options={options}
            fullWidth={true}
            style={{ marginRight: "0.3rem" }}
            getOptionLabel={(options) => options.title}
            renderInput={(params) => (
              <TextField {...params} label="Tech" variant="outlined" />
            )}
          />
          <FormControl variant="outlined">
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
      </form>
    );
  }
}

export default connect(null, { fetchJobs })(Form);
