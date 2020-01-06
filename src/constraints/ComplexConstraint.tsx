import React, { CSSProperties } from "react";
import {
  Constraint,
  canClearConstraint,
  canFlagConstraint
} from "../utils/Constraint";
import { useDispatch } from "../utils/Actions";
import { SetHoverConstraintAction, SelectConstraintAction } from "./Reducer";
import { ClearCellAction, FlagCellAction } from "../board/Reducer";
import "./Styles.scss";
import { useSelector } from "../utils/Selector";
import { selectAutoClear, selectAutoFlag, selectCheatMode } from "../options/Reducer";

export type Props = {
  constraint: Constraint;
};

const Component: React.FC<Props> = ({ constraint }: Props) => {
  const { coords, minMines, maxMines } = constraint;
  const cellCount = coords.length;
  const dispatch = useDispatch<
    | SetHoverConstraintAction
    | SelectConstraintAction
    | ClearCellAction
    | FlagCellAction
  >();

const canClear = canClearConstraint(constraint);
const canFlag = canFlagConstraint(constraint);

  const onClick = () => {
    if (constraint === null) return;
    if (canClear) return clearConstraint(constraint);
    if (canFlag) return flagConstraint(constraint);
    return dispatch({ type: "SELECT_CONSTRAINT", constraint });
  };

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

  const autoClear = useSelector(selectAutoClear);
  if (autoClear && canClear) clearConstraint(constraint);

  const autoFlag = useSelector(selectAutoFlag);
  if (autoFlag && canFlag) flagConstraint(constraint);

  const style: CSSProperties = {};
  if (canClearConstraint || canFlagConstraint) {
    style.cursor = "pointer";
  }

  const cheatMode = useSelector(selectCheatMode);
  if (cheatMode) {
    if (canClear) {
      style.background = "#00ff0050";
    } else if (canFlag) {
      style.background = "#ff000050";
    }
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={() =>
        dispatch({ type: "SET_HOVER_CONSTRAINT", constraint })
      }
      onMouseLeave={() =>
        dispatch({ type: "SET_HOVER_CONSTRAINT", constraint: null })
      }
      className="constraint"
      style={style}
    >
      <div>Cells: {cellCount}</div>
      <div>
        Mines: {minMines} - {maxMines}
      </div>
    </div>
  );
};

export default Component;
