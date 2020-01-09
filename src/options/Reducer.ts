import { ReducerBuilder } from "../utils/Reducer";
import { Action } from "@reduxjs/toolkit";
import { sliceSelector, selectorCreator } from "../utils/Selector";
import { LoadBoardAction } from "../board/Reducer";

export type State = {
  cheatMode: boolean;
  autoZero: boolean;
  autoClear: boolean;
  autoFlag: boolean;
  showRemaining: boolean;
  showCoords: boolean;
  showSubtraction: boolean;
  showReduce: boolean;
  showMerge: boolean;
  showBoardConstraint: boolean;
  showOptions: boolean;
  resolveComplex: boolean;
};

const INITIAL_STATE: State = {
  showRemaining: false,
  cheatMode: false,
  autoZero: true,
  autoClear: false,
  autoFlag: false,
  showCoords: false,
  showSubtraction: false,
  showReduce: false,
  showMerge: false,
  showBoardConstraint: false,
  showOptions: false,
  resolveComplex: false
};

// Reducer
export const reducer = ReducerBuilder.create(INITIAL_STATE)
  .addCase("SET_OPTION", (state, { option, value }: SetOptionAction) => {
    state[option] = value;
  })
  .addCase("LOAD_BOARD", (state, {options}: LoadBoardAction) => {
    Object.assign(state, options)
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
export const selectShowReduce = selector(s => s.showReduce);
export const selectShowMerge = selector(s => s.showMerge);
export const selectShowComplexConstraints = selector(s => s.showSubtraction || s.showReduce || s.showMerge);
export const selectShowBoardConstraint = selector(s => s.showBoardConstraint);
export const selectShowOptions = selector(s => s.showOptions);
export const selectResolveComplex = selector(s => s.resolveComplex);