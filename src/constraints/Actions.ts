import { Constraint } from "../utils/Constraint";
import { Action } from "redux";

export type SelectConstraintAction = Action<"SELECT_CONSTRAINT"> & {
  constraint: Constraint;
};
export type ClearSelectedConstraintsAction = Action<
  "CLEAR_SELECTED_CONSTRAINTS"
>;
export type SetTargetConstraintAction = Action<"SET_TARGET_CONSTRAINT"> & {
  constraint: Constraint | null;
};
export type AddConstraintAction = Action<"ADD_CONSTRAINT"> & {
  constraint: Constraint;
}
export type DeleteConstraintAction = Action<"DELETE_CONSTRAINT"> & {
  index: number;
};
