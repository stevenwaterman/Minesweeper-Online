import { createStore, combineReducers } from "redux";

import {
  reducer as boardReducer,
} from "../board/Reducer";

export type RootState = ReturnType<typeof reducer>;
export const reducer = combineReducers({
  board: boardReducer
});
export const store = createStore(reducer);
