import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/combine";
import { devToolsEnhancer } from "redux-devtools-extension";

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunkMiddleware), devToolsEnhancer())
);
