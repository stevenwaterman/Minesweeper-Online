import React from "react";
import "./Styles.scss";
import { Constraint } from "../../utils/Constraint";
import { useDispatch } from "../../utils/Actions";
import {
  AddConstraintAction,
  SetTargetConstraintAction,
  ClearSelectedConstraintsAction
} from "../Actions";

type Props = {
  constraint: Constraint | null;
  text: string;
};

const Component: React.FC<Props> = ({ text, constraint }) => {
  const dispatch = useDispatch<
    | AddConstraintAction
    | SetTargetConstraintAction
    | ClearSelectedConstraintsAction
  >();

  const addConstraint = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (constraint === null) return;
    dispatch({ type: "ADD_CONSTRAINT", constraint });
    dispatch({ type: "CLEAR_SELECTED_CONSTRAINTS" });
  };
  const setTargetConstraint = () => {
    if (constraint === null) return;
    dispatch({ type: "SET_TARGET_CONSTRAINT", constraint });
  };
  const clearTargetConstraint = () => {
    if (constraint === null) return;
    dispatch({ type: "SET_TARGET_CONSTRAINT", constraint: null });
  };

  const className = `constraintButton${constraint === null ? "" : " enabled"}`;

  return (
    <button
      onClick={addConstraint}
      onMouseEnter={setTargetConstraint}
      onMouseLeave={clearTargetConstraint}
      className={className}
    >
      {text}
    </button>
  );
};

export default Component;
