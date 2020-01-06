import { ReducerBuilder } from "../utils/Reducer";
import { Constraint, constraintEquals } from "../utils/Constraint";
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
  .addCase(
    "SELECT_CONSTRAINT",
    (state, { constraint }: SelectConstraintAction) => {
      if (state.first === null) {
        state.first = constraint;
      } else if (state.second === null) {
        state.second = constraint;
      }
      if (constraintEquals(state.hovering, constraint)) {
        state.hovering = null;
      }
    }
  )
  .addCase(
    "SET_HOVER_CONSTRAINT",
    (state, { constraint }: SetHoverConstraintAction) => {
      if (constraint !== null) {
        if (constraintEquals(state.first, constraint)) return;
        if (constraintEquals(state.second, constraint)) return;
      }
      state.hovering = constraint;
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
export type SelectConstraintAction = Action<"SELECT_CONSTRAINT"> & {
  constraint: Constraint;
};
export type ClearSelectedConstraintsAction = Action<
  "CLEAR_SELECTED_CONSTRAINTS"
>;
export type SetHoverConstraintAction = Action<"SET_HOVER_CONSTRAINT"> & {
  constraint: Constraint | null;
};

// Selectors
export const selectSlice = sliceSelector("constraints");
export const selector = selectorCreator(selectSlice);
export const selectFirst = selector(s => s.first);
export const selectSecond = selector(s => s.second);
export const selectHover = selector(s => s.hovering);
export const selectAnySelected = selector(
  s => s.first !== null || s.second !== null
);
