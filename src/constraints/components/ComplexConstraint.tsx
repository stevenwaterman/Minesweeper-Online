import React from "react";
import {
  Constraint,
  canClear,
  canFlag,
  clearConstraint,
  flagConstraint
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
  SetTargetConstraintsAction
} from "../Actions";

export type Props = {
  constraint: Constraint;
  index?: number | null;
};

const Component: React.FC<Props> = ({ constraint, index = null }: Props) => {
  const { coords, minMines, maxMines } = constraint;
  const cellCount = coords.length;
  const dispatch = useDispatch<
    | SetTargetConstraintsAction
    | SelectConstraintAction
    | ClearCellAction
    | FlagCellAction
    | DeleteConstraintAction
  >();

  const clearable = canClear(constraint);
  const flaggable = canFlag(constraint);

  const onClick = () => {
    if (constraint === null) return;
    if (clearable) return clearConstraint(dispatch, constraint);
    if (flaggable) return flagConstraint(dispatch, constraint);
    return dispatch({ type: "SELECT_CONSTRAINT", constraint });
  };

  const onContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (index !== null) {
      dispatch({ type: "DELETE_CONSTRAINT", index });
    }
  };

  const autoClear = useSelector(selectAutoClear);
  if (autoClear && clearable) clearConstraint(dispatch, constraint);

  const autoFlag = useSelector(selectAutoFlag);
  if (autoFlag && flaggable) flagConstraint(dispatch, constraint);

  let className = "constraint";

  const cheatMode = useSelector(selectCheatMode);
  if (cheatMode) {
    if (clearable) {
      className += " clearable";
    } else if (flaggable) {
      className += " flaggable";
    }
  }

  return (
    <div
      onClick={onClick}
      onContextMenu={onContextMenu}
      onMouseEnter={() =>
        dispatch({ type: "SET_TARGET_CONSTRAINTS", constraints: [constraint] })
      }
      onMouseLeave={() =>
        dispatch({ type: "SET_TARGET_CONSTRAINTS", constraints: [] })
      }
      className={className}
    >
      <div>Cells: {cellCount}</div>
      <div>
        Mines: {minMines} - {maxMines}
      </div>
    </div>
  );
};

export default Component;
