import { Constraint } from "../utils/Constraint";
import { Action } from "redux";

export type SelectConstraintAction = Action<"SELECT_CONSTRAINT"> & {
  constraint: Constraint;
};
export type ClearSelectedConstraintsAction = Action<
  "CLEAR_SELECTED_CONSTRAINTS"
>;
export type SetTargetConstraintsAction = Action<"SET_TARGET_CONSTRAINTS"> & {
  constraints: Array<Constraint | null>;
};
export type AddConstraintsAction = Action<"ADD_CONSTRAINTS"> & {
  constraints: Constraint[];
};
export type DeleteConstraintAction = Action<"DELETE_CONSTRAINT"> & {
  index: number;
};
