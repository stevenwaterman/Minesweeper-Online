import { ReducerBuilder } from "../utils/Reducer";
import { Constraint } from "../utils/Constraint";
import { Action } from "@reduxjs/toolkit";
import { sliceSelector, selectorCreator } from "../utils/Selector";


type State = {
  first: Constraint | null;
  second: Constraint | null;
  hovering: Constraint | null;

  complexConstraints: Array<Constraint>;
};

const INITIAL_STATE: State = {
  first: null,
  second: null,
  hovering: null,

  complexConstraints: []
};

// Reducer
export const reducer = ReducerBuilder.create(INITIAL_STATE)
  .addCase("SELECT_CONSTRAINT", (state, action: SelectConstraintAction) => {
    if (state.first === null) {
      state.first = action.constraint;
    } else if (state.second === null) {
      state.second = action.constraint;
    }
  })
  .addCase(
    "SET_HOVER_CONSTRAINT",
    (state, action: SetHoverConstraintAction) => {
      state.hovering = action.constraint;
    }
  )
  .addCase(
    "CLEAR_SELECTED_CONSTRAINTS",
    (state, _: ClearSelectedConstraintsAction) => {
      state.first = null;
      state.second = null;
    }
  )
  .build();

// Actions
export type SelectConstraintAction = Action<"SELECT_CONSTRAINT"> & { constraint: Constraint; };
export type ClearSelectedConstraintsAction = Action<"CLEAR_SELECTED_CONSTRAINTS">
export type SetHoverConstraintAction = Action<"SET_HOVER_CONSTRAINT"> & { constraint: Constraint | null; };

// Selectors
export const selectSlice = sliceSelector("constraints");
export const select = selectorCreator(selectSlice);
export const selectFirst = select(s => s.first);
export const selectSecond = select(s => s.second);
export const selectAnySelected = select(s => s.first !== null || s.second !== null);
