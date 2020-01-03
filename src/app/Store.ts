import { createStore } from "redux";
import { reducer } from "./Reducer";
import {
  devToolsEnhancer
} from "redux-devtools-extension";

export const store = createStore(reducer, devToolsEnhancer({}));
