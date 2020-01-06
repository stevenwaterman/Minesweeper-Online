import { ReducerBuilder } from "../utils/Reducer";
import {
  Constraint,
  constraintEquals,
  canSubtract,
  canMerge,
  canOverlap,
  subtractConstraints,
  cellFlagged,
  cellCleared,
  mergeConstraints,
  overlapConstraints
} from "../utils/Constraint";
import { Action } from "@reduxjs/toolkit";
import { sliceSelector, selectorCreator } from "../utils/Selector";
import {
  ClearCellAction,
  FlagCellAction,
  RegenerateBoardAction
} from "../board/Reducer";

type State = {
  first: Constraint | null;
  second: Constraint | null;
  hovering: Constraint | null;

  complexConstraints: Array<Constraint>;
  hasWholeBoardConstraint: boolean;
};

const INITIAL_STATE: State = {
  first: null,
  second: null,
  hovering: null,

  complexConstraints: [],
  hasWholeBoardConstraint: false
};

// Reducer
export const reducer = ReducerBuilder.create(INITIAL_STATE)
  .addCase(
    "SELECT_CONSTRAINT",
    (state, { constraint }: SelectConstraintAction) => {
      if (constraintEquals(state.first, constraint)) return;
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
        if (constraint.coords.length === 0) return;
        if (constraintEquals(state.first, constraint)) return;
        if (constraintEquals(state.second, constraint)) return;
      }
      if (state.second === null) {
        state.hovering = constraint;
      }
    }
  )
  .addCase(
    "CLEAR_SELECTED_CONSTRAINTS",
    (state, _: ClearSelectedConstraintsAction) => {
      state.first = null;
      state.second = null;
    }
  )
  .addCase("CLEAR_CELL", (state, { coordinate }: ClearCellAction) => {
    state.first = null;
    state.second = null;
    state.hovering = null;
    state.complexConstraints = state.complexConstraints
      .map(constraint => cellCleared(constraint, ...coordinate))
      .filter(constraint => constraint !== null) as Constraint[];
  })
  .addCase("FLAG_CELL", (state, { coordinate }: FlagCellAction) => {
    state.first = null;
    state.second = null;
    state.hovering = null;
    state.complexConstraints = state.complexConstraints
      .map(constraint => cellFlagged(constraint, ...coordinate))
      .filter(constraint => constraint !== null) as Constraint[];
  })
  .addCase("SUBTRACT_CONSTRAINTS", (state, _: SubtractConstraintsAction) => {
    if (state.first === null || state.second === null) return;
    const [big, small] =
      state.first.coords.length > state.second.coords.length
        ? [state.first, state.second]
        : [state.second, state.first];
    if (!canSubtract(big, small)) return;

    const newConstraint = subtractConstraints(big, small);
    state.complexConstraints.push(newConstraint);
    state.first = null;
    state.second = null;
  })
  .addCase("MERGE_CONSTRAINTS", (state, _: MergeConstraintsAction) => {
    if (state.first === null || state.second === null) return;
    if (!canMerge(state.first, state.second)) return;

    const newConstraint = mergeConstraints(state.first, state.second);
    state.complexConstraints.push(newConstraint);
    state.first = null;
    state.second = null;
  })
  .addCase("OVERLAP_CONSTRAINTS", (state, _: OverlapConstraintsAction) => {
    if (state.first === null || state.second === null) return;
    if (!canOverlap(state.first, state.second)) return;

    const newConstraint = overlapConstraints(state.first, state.second);
    state.complexConstraints.push(newConstraint);
    state.first = null;
    state.second = null;
  })
  .addCase("REGENERATE_BOARD", (state, _: RegenerateBoardAction) => {
    Object.assign(state, INITIAL_STATE);
  })
  .addCase(
    "WHOLE_BOARD_CONSTRAINT",
    (state, { constraint }: WholeBoardConstraint) => {
      state.complexConstraints.push(constraint);
      state.hasWholeBoardConstraint = true;
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
export type SubtractConstraintsAction = Action<"SUBTRACT_CONSTRAINTS">;
export type MergeConstraintsAction = Action<"MERGE_CONSTRAINTS">;
export type OverlapConstraintsAction = Action<"OVERLAP_CONSTRAINTS">;
export type WholeBoardConstraint = Action<"WHOLE_BOARD_CONSTRAINT"> & {
  constraint: Constraint;
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
export const selectCanSubtract = selector(
  s => canSubtract(s.first, s.second) || canSubtract(s.second, s.first)
);
export const selectCanMerge = selector(
  s => s.first !== null && s.second !== null && canMerge(s.first, s.second)
);
export const selectCanReduce = selector(
  s => s.first !== null && s.second !== null && canOverlap(s.first, s.second)
);
export const selectComplexConstraints = selector(s => s.complexConstraints);
export const selectHasWholeBoardConstraint = selector(
  s => s.hasWholeBoardConstraint
);
