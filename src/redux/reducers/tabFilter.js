import { CHANGE_TAB } from "../actionTypes";
import { TABS } from "../constants";

const initialState = TABS.CURRENT;

const tabFilter = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TAB: {
      return action.payload.tab;
    }
    default:
      return state;
  }
};

export default tabFilter;
