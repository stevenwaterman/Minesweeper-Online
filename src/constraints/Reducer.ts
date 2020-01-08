import { ReducerBuilder } from "../utils/Reducer";
import {
  Constraint,
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
  SetTargetConstraintsAction,
  ClearSelectedConstraintsAction,
  DeleteConstraintAction,
  AddConstraintsAction
} from "./Actions";

type State = {
  first: Constraint | null;
  second: Constraint | null;
  targets: Array<Constraint>;

  complexConstraints: Array<Constraint>;
};

const INITIAL_STATE: State = {
  first: null,
  second: null,
  targets: [],

  complexConstraints: []
};

function resetSelected(state: State){
  state.first = null;
  state.second = null;
  state.targets = [];
}

// Reducer
export const reducer = ReducerBuilder.create(INITIAL_STATE)
         .addCase(
           "SELECT_CONSTRAINT",
           (state, { constraint }: SelectConstraintAction) => {
             if (state.first === constraint) return;
             if (state.second === constraint) return;

             state.targets = [];

             if (state.first === null) {
               state.first = constraint;
             } else {
               state.second = constraint;
             }
           }
         )
         .addCase(
           "SET_TARGET_CONSTRAINTS",
           (state, { constraints }: SetTargetConstraintsAction) => {
             state.targets = constraints.filter(c => c !== null) as Constraint[];
           }
         )
         .addCase(
           "CLEAR_SELECTED_CONSTRAINTS",
           (state, _: ClearSelectedConstraintsAction) => {
             resetSelected(state);
           }
         )
         .addCase("CLEAR_CELL", (state, { coordinate }: ClearCellAction) => {
           resetSelected(state);
           state.complexConstraints = state.complexConstraints
             .map(constraint => cellCleared(constraint, ...coordinate))
             .filter(constraint => constraint !== null) as Constraint[];
         })
         .addCase("FLAG_CELL", (state, { coordinate }: FlagCellAction) => {
           resetSelected(state);
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
             resetSelected(state);
           }
         )
         .addCase(
           "ADD_CONSTRAINTS",
           (state, { constraints }: AddConstraintsAction) => {
             state.complexConstraints.push(...constraints);
           }
         )
         .build();
