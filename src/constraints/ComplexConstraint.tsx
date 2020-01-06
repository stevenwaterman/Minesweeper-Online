import React from "react";
import {
  Constraint,
  canClearConstraint,
  canFlagConstraint
} from "../utils/Constraint";
import { useDispatch } from "../utils/Actions";
import { SetHoverConstraintAction, SelectConstraintAction } from "./Reducer";
import { ClearCellAction, FlagCellAction } from "../board/Reducer";
import "./Styles.scss";

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

  const onClick = () => {
    if (constraint === null) return;
    if (canClearConstraint(constraint)) return clearConstraint(constraint);
    if (canFlagConstraint(constraint)) return flagConstraint(constraint);
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
    >
      <div>Cells: {cellCount}</div>
      <div>
        Mines: {minMines} - {maxMines}
      </div>
    </div>
  );
};

export default Component;
