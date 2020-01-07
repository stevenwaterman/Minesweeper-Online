import { useArgSelector, useSelector } from "../utils/Selector";
import {
  selectCellState,
  selectCellStateKnown,
  selectConstraint,
  ClearCellAction,
  FlagCellAction
} from "./Reducer";
import { Coordinate } from "../utils/Cells";
import React from "react";
import "./Styles.scss";
import { useDispatch } from "../utils/Actions";
import {
  canClearConstraint,
  canFlagConstraint,
  Constraint
} from "../utils/Constraint";
import {
  selectCheatMode,
  selectAutoZero,
  selectAutoClear,
  selectAutoFlag,
  selectShowRemaining
} from "../options/Reducer";
import {
  SelectConstraintAction,
  SetTargetConstraintAction
} from "../constraints/Actions";

type Props = {
  coordinate: Coordinate;
};

const Component: React.FC<Props> = props => {
  const state = useArgSelector(selectCellState, props);
  const stateKnown = useArgSelector(selectCellStateKnown, props);
  const constraint = useArgSelector(selectConstraint, props);

  const dispatch = useDispatch<
    | SetTargetConstraintAction
    | SelectConstraintAction
    | ClearCellAction
    | FlagCellAction
  >();

  let className = "cell";
  if (constraint !== null) className += " clickable";

  const cheatMode = useSelector(selectCheatMode);
  if (cheatMode && constraint !== null) {
    if (canClearConstraint(constraint)) {
      className += " clearable";
    } else if (canFlagConstraint(constraint)) {
      className += " flaggable";
    }
  }

  function clearConstraint(constraint: Constraint) {
    constraint.coords.forEach(coordinate =>
      dispatch({ type: "CLEAR_CELL", coordinate })
    );
  }

  function flagConstraint(constraint: Constraint) {
    constraint.coords.forEach(coordinate =>
      dispatch({ type: "FLAG_CELL", coordinate })
    );
  }

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (constraint === null) return;
    if (canClearConstraint(constraint)) return clearConstraint(constraint);
    if (canFlagConstraint(constraint)) return flagConstraint(constraint);
    return dispatch({ type: "SELECT_CONSTRAINT", constraint });
  };

  const autoZero = useSelector(selectAutoZero);
  const autoClear = useSelector(selectAutoClear);
  const autoFlag = useSelector(selectAutoFlag);
  if (stateKnown && constraint !== null) {
    if (autoZero && state === 0) clearConstraint(constraint);
    if (autoClear && canClearConstraint(constraint))
      clearConstraint(constraint);
    if (autoFlag && canFlagConstraint(constraint)) flagConstraint(constraint);
  }

  let text = "";
  const showRemaining = useSelector(selectShowRemaining);
  if (stateKnown) {
    if (showRemaining && state !== "X") {
      const mines = constraint === null ? 0 : constraint.maxMines;
      text = mines.toString();
    } else {
      text = state.toString();
    }
    className += ` state${text}`;
  }

  return (
    <div
      className={className}
      onPointerEnter={
        constraint === null
          ? undefined
          : () => dispatch({ type: "SET_TARGET_CONSTRAINT", constraint })
      }
      onPointerLeave={
        constraint === null
          ? undefined
          : () => dispatch({ type: "SET_TARGET_CONSTRAINT", constraint: null })
      }
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default Component;
