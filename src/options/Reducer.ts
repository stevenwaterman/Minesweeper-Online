import { ReducerBuilder } from "../utils/Reducer";
import { Action } from "@reduxjs/toolkit";
import { sliceSelector, selectorCreator } from "../utils/Selector";

type State = {
  cheatMode: boolean;
  autoZero: boolean;
  autoClear: boolean;
  autoFlag: boolean;
  showRemaining: boolean;
};

const INITIAL_STATE: State = {
  showRemaining: false,
  cheatMode: false,
  autoZero: false,
  autoClear: false,
  autoFlag: false
};

// Reducer
export const reducer = ReducerBuilder.create(INITIAL_STATE)
  .addCase("SET_OPTION", (state, { option, value }: SetOptionAction) => {
    state[option] = value;
  })
  .build();

// Actions
export type SetOptionAction = Action<"SET_OPTION"> & {
  option: keyof State;
  value: boolean;
};

// Selectors
export const selectSlice = sliceSelector("options");
export const selector = selectorCreator(selectSlice);
export const selectCheatMode = selector(s => s.cheatMode);
export const selectAutoZero = selector(s => s.autoZero);
export const selectAutoClear = selector(s => s.autoClear);
export const selectAutoFlag = selector(s => s.autoFlag);
export const selectShowRemaining = selector(s => s.showRemaining);
