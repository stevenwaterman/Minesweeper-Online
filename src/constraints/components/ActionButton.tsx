import React from "react";
import "./Styles.scss";
import { Constraint, canClear, canFlag, clearConstraint, flagConstraint } from "../../utils/Constraint";
import { useDispatch } from "../../utils/Actions";
import {
  AddConstraintsAction,
  SetTargetConstraintsAction,
  ClearSelectedConstraintsAction
} from "../Actions";
import { useSelector } from "../../utils/Selector";
import { ClearCellAction, FlagCellAction } from "../../board/Reducer";
import { selectResolveComplex } from "../../options/Reducer";

type Props = {
  constraints: Array<Constraint>;
  text: string;
};

const Component: React.FC<Props> = ({ text, constraints }) => {
  const dispatch = useDispatch<
    | AddConstraintsAction
    | SetTargetConstraintsAction
    | ClearSelectedConstraintsAction
    | ClearCellAction
    | FlagCellAction
  >();
  const resolveComplex = useSelector(selectResolveComplex);

  const addConstraints = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (constraints.length === 0) return;
    dispatch({ type: "CLEAR_SELECTED_CONSTRAINTS" });
    if (resolveComplex) {
      const clearable = constraints.filter(c => canClear(c));
      clearable.forEach(c => clearConstraint(dispatch, c));

      const flaggable = constraints.filter(c => canFlag(c));
      flaggable.forEach(c => flagConstraint(dispatch, c));

      const nonSolvable = constraints.filter(c => !canClear(c) && !canFlag(c));
      dispatch({ type: "ADD_CONSTRAINTS", constraints: nonSolvable });
    } else {
      dispatch({ type: "ADD_CONSTRAINTS", constraints });
    }
  };
  const setTargetConstraints = () => {
    if (constraints.length === 0) return;
    dispatch({ type: "SET_TARGET_CONSTRAINTS", constraints });
  };
  const clearTargetConstraints = () => {
    if (constraints.length === 0) return;
    dispatch({ type: "SET_TARGET_CONSTRAINTS", constraints: [] });
  };

  let className = "constraintButton";
  if (constraints.length !== 0) {
    className += " enabled";
  }

  return (
    <button
      onClick={addConstraints}
      onMouseEnter={setTargetConstraints}
      onMouseLeave={clearTargetConstraints}
      className={className}
    >
      {text}
    </button>
  );
};

export default Component;
