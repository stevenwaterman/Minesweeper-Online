import { ReducerBuilder } from "../utils/Reducer";
import {
  Constraint,
  constraintEquals,
  cellFlagged,
  cellCleared
} from "../utils/Constraint";
import {
  ClearCellAction,
  FlagCellAction,
  RegenerateBoardAction,
  LoadBoardAction
} from "../board/Reducer";
import {
  SelectConstraintAction,
  SetTargetConstraintAction,
  ClearSelectedConstraintsAction,
  DeleteConstraintAction,
  AddConstraintAction
} from "./Actions";

type State = {
  first: Constraint | null;
  second: Constraint | null;
  target: Constraint | null;

  complexConstraints: Array<Constraint>;
};

const INITIAL_STATE: State = {
  first: null,
  second: null,
  target: null,

  complexConstraints: []
};

// Reducer
export const reducer = ReducerBuilder.create(INITIAL_STATE)
         .addCase(
           "SELECT_CONSTRAINT",
           (state, { constraint }: SelectConstraintAction) => {
             if (state.first === constraint) return;
             if (state.second === constraint) return;

             state.target = null;

             if (state.first === null) {
               state.first = constraint;
             } else {
               state.second = constraint;
             }
           }
         )
         .addCase(
           "SET_TARGET_CONSTRAINT",
           (state, { constraint }: SetTargetConstraintAction) => {
             if (constraint !== null) {
               if (constraint.coords.length === 0) return;
               if (constraintEquals(state.first, constraint)) return;
               if (constraintEquals(state.second, constraint)) return;
             }
             state.target = constraint;
           }
         )
         .addCase(
           "CLEAR_SELECTED_CONSTRAINTS",
           (state, _: ClearSelectedConstraintsAction) => {
             state.first = null;
             state.second = null;
             state.target = null;
           }
         )
         .addCase("CLEAR_CELL", (state, { coordinate }: ClearCellAction) => {
           state.first = null;
           state.second = null;
           state.target = null;
           state.complexConstraints = state.complexConstraints
             .map(constraint => cellCleared(constraint, ...coordinate))
             .filter(constraint => constraint !== null) as Constraint[];
         })
         .addCase("FLAG_CELL", (state, { coordinate }: FlagCellAction) => {
           state.first = null;
           state.second = null;
           state.target = null;
           state.complexConstraints = state.complexConstraints
             .map(constraint => cellFlagged(constraint, ...coordinate))
             .filter(constraint => constraint !== null) as Constraint[];
         })
         .addCase("REGENERATE_BOARD", (state, _: RegenerateBoardAction) => {
           Object.assign(state, INITIAL_STATE);
         })
         .addCase("LOAD_BOARD", (state, _: LoadBoardAction) => {
           Object.assign(state, INITIAL_STATE);
         })
         .addCase(
           "DELETE_CONSTRAINT",
           (state, { index }: DeleteConstraintAction) => {
             state.complexConstraints.splice(index, 1);
             state.first = null;
             state.second = null;
             state.target = null;
           }
         )
         .addCase(
           "ADD_CONSTRAINT",
           (state, { constraint }: AddConstraintAction) => {
             state.complexConstraints.push(constraint);
           }
         )
         .build();
