import { combineReducers } from "redux";
import tabFilter from "./tabFilter";
import jobs from "./jobs";
import pageFilter from "./pageFilter";

export default combineReducers({ jobs, tabFilter, pageFilter });
