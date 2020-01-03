import { combineReducers } from "redux";

import { reducer as boardReducer } from "../board/Reducer";
import {reducer as constraintReducer} from "../constraints/Reducer";
export type RootState = ReturnType<typeof reducer>;
export const reducer = combineReducers({
  board: boardReducer,
  constraints: constraintReducer
});
