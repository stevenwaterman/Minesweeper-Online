import { ReducerBuilder } from "../utils/Reducer";
import { Action } from "@reduxjs/toolkit";
import { sliceSelector, selectorCreator } from "../utils/Selector";

export type State = {
  cheatMode: boolean;
  autoZero: boolean;
  autoClear: boolean;
  autoFlag: boolean;
  showRemaining: boolean;
  showCoords: boolean;
  showSubtraction: boolean;
  showOverlap: boolean;
  showMerge: boolean;
  showBoardConstraint: boolean;
  showOptions: boolean;
};

const INITIAL_STATE: State = {
  showRemaining: false,
  cheatMode: false,
  autoZero: true,
  autoClear: false,
  autoFlag: false,
  showCoords: false,
  showSubtraction: false,
  showOverlap: false,
  showMerge: false,
  showBoardConstraint: false,
  showOptions: false
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
export const selectShowCoords = selector(s => s.showCoords);
export const selectShowSubtraction = selector(s => s.showSubtraction);
export const selectShowOverlap = selector(s => s.showOverlap);
export const selectShowMerge = selector(s => s.showMerge);
export const selectShowComplexConstraints = selector(s => s.showSubtraction || s.showOverlap || s.showMerge);
export const selectShowBoardConstraint = selector(s => s.showBoardConstraint);
export const selectShowOptions = selector(s => s.showOptions);