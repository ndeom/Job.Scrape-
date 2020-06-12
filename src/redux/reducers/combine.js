import { combineReducers } from "redux";
import tabFilter from "./tabFilter";
import jobs from "./jobs";

export default combineReducers({ jobs, tabFilter });
