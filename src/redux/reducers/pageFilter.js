import { CHANGE_PAGE } from "../actionTypes";

const initialState = 1;

const pageFilter = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PAGE:
      return action.payload.page;

    default:
      return state;
  }
};

export default pageFilter;
