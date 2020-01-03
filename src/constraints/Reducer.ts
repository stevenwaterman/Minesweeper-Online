import { Cell, Coordinate } from "../utils/Cells";
import { ReducerBuilder } from "../utils/Reducer";
import { actionCreator } from "../utils/ActionCreator";
import { RootState } from "../app/Reducer";

export interface UnknownCell extends Cell {
  cellStateKnown: false;
}

export type Constraint = {
  cells: UnknownCell[];
  minMines: number;
  maxMines: number;
};

type State = {
  first: Constraint | null;
  second: Constraint | null;
  hovering: Constraint | null;

  constraints: Array<Constraint>;
};

const INITIAL_STATE: State = {
  first: null,
  second: null,
  hovering: null
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
export type SelectConstraintAction = {
  type: "SELECT_CONSTRAINT";
  constraint: Constraint;
};
export const createSelectConstraintAction = actionCreator<
  SelectConstraintAction
>("SELECT_CONSTRAINT");

export type ClearSelectedConstraintsAction = {
  type: "CLEAR_SELECTED_CONSTRAINTS";
};
export const createClearSelectedConstraintsAction = actionCreator<
  ClearSelectedConstraintsAction
>("CLEAR_SELECTED_CONSTRAINTS");

export type SetHoverConstraintAction = {
  type: "SET_HOVER_CONSTRAINT";
  constraint: Constraint | null;
};
export const createSetHoverConstraintAction = actionCreator<
  SetHoverConstraintAction
>("SET_HOVER_CONSTRAINT");

// Selectors
export function getState(state: RootState): State {
  return state.constraints;
}
export function selectFirstSelectedConstraint(
  state: RootState
): Constraint | null {
  return getState(state).first;
}
export function selectSecondSelectedConstraint(
  state: RootState
): Constraint | null {
  return getState(state).second;
}
export function selectAnyConstraintSelected(state: RootState): boolean {
  const slice = getState(state);
  return slice.first != null || slice.second != null;
}
