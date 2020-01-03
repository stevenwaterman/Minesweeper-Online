import { createStore, combineReducers } from "redux";

import {reducer as boardReducer} from "../board/BoardReducer";

export const reducer = combineReducers(boardReducer)
export const store = createStore(reducer);