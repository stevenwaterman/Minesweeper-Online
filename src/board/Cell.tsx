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
import {
  SetHoverConstraintAction,
  SelectConstraintAction
} from "../constraints/Reducer";
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
  selectAutoFlag
} from "../options/Reducer";

type Props = {
  coordinate: Coordinate;
};

const Component: React.FC<Props> = props => {
  const state = useArgSelector(selectCellState, props);
  const stateKnown = useArgSelector(selectCellStateKnown, props);
  const constraint = useArgSelector(selectConstraint, props);

  const dispatch = useDispatch<
    | SetHoverConstraintAction
    | SelectConstraintAction
    | ClearCellAction
    | FlagCellAction
  >();

  const style: React.CSSProperties = {};
  if (constraint !== null) style.cursor = "pointer";
  if (!stateKnown) {
    style.background = "#dddddd";
  }
  if (stateKnown && state === "X") {
    style.background = "#ff9999";
  }

  const cheatMode = useSelector(selectCheatMode);
  if (cheatMode && constraint !== null) {
    if (canClearConstraint(constraint)) {
      style.background = "#00ff0050";
    } else if (canFlagConstraint(constraint)) {
      style.background = "#ff000050";
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

  const onClick = () => {
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

  return (
    <div
      className="cell"
      style={style}
      onPointerEnter={
        constraint === null
          ? undefined
          : () => dispatch({ type: "SET_HOVER_CONSTRAINT", constraint })
      }
      onPointerLeave={
        constraint === null
          ? undefined
          : () => dispatch({ type: "SET_HOVER_CONSTRAINT", constraint: null })
      }
      onClick={onClick}
    >
      {stateKnown && state !== "X" && state !== 0 ? state : ""}
    </div>
  );
};

export default Component;
