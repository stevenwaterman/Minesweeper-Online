import React from "react";
import { Constraint } from "../utils/Constraint";
import { useDispatch } from "../utils/Actions";
import { SetHoverConstraintAction, SelectConstraintAction } from "./Reducer";

export type Props = {
  constraint: Constraint;
};

const Component: React.FC<Props> = ({ constraint }: Props) => {
  const { coords, minMines, maxMines } = constraint;
  const cellCount = coords.length;
  const dispatch = useDispatch<
    SetHoverConstraintAction | SelectConstraintAction
  >();

  return (
    <div
      onClick={() => dispatch({ type: "SELECT_CONSTRAINT", constraint })}
      onMouseEnter={() =>
        dispatch({ type: "SET_HOVER_CONSTRAINT", constraint })
      }
      onMouseLeave={() =>
        dispatch({ type: "SET_HOVER_CONSTRAINT", constraint: null })
      }
    >
      <div>Cells: {cellCount}</div>
      <div>
        Mines: {minMines} - {maxMines}
      </div>
    </div>
  );
};

export default Component;
