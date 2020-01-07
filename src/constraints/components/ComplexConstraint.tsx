import React, { CSSProperties } from "react";
import {
  Constraint,
  canClearConstraint,
  canFlagConstraint
} from "../../utils/Constraint";
import { useDispatch } from "../../utils/Actions";
import { ClearCellAction, FlagCellAction } from "../../board/Reducer";
import "./Styles.scss";
import { useSelector } from "../../utils/Selector";
import {
  selectAutoClear,
  selectAutoFlag,
  selectCheatMode
} from "../../options/Reducer";
import {
  SelectConstraintAction,
  DeleteConstraintAction,
  SetTargetConstraintAction
} from "../Actions";

export type Props = {
  constraint: Constraint;
  index?: number | null;
};

const Component: React.FC<Props> = ({ constraint, index = null }: Props) => {
  const { coords, minMines, maxMines } = constraint;
  const cellCount = coords.length;
  const dispatch = useDispatch<
    | SetTargetConstraintAction
    | SelectConstraintAction
    | ClearCellAction
    | FlagCellAction
    | DeleteConstraintAction
  >();

  const canClear = canClearConstraint(constraint);
  const canFlag = canFlagConstraint(constraint);

  const onClick = () => {
    if (constraint === null) return;
    if (canClear) return clearConstraint(constraint);
    if (canFlag) return flagConstraint(constraint);
    return dispatch({ type: "SELECT_CONSTRAINT", constraint });
  };

  const onContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (index !== null) {
      dispatch({ type: "DELETE_CONSTRAINT", index });
    }
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
      style.background = "#5f5";
    } else if (canFlag) {
      style.background = "#f55";
    }
  }

  return (
    <div
      onClick={onClick}
      onContextMenu={onContextMenu}
      onMouseEnter={() =>
        dispatch({ type: "SET_TARGET_CONSTRAINT", constraint })
      }
      onMouseLeave={() =>
        dispatch({ type: "SET_TARGET_CONSTRAINT", constraint: null })
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
