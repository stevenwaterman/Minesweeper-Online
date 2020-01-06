import React from "react";
import { useSelector, Selector } from "../utils/Selector";
import { Constraint } from "../utils/Constraint";
import { useDispatch } from "react-redux";
import { fire } from "../utils/Actions";
import { ClearCellAction, FlagCellAction } from "../board/Reducer";

export type Props = {
  constraintSelector: Selector<Constraint | null>;
};

const Component: React.FC<Props> = ({ constraintSelector }: Props) => {
  const dispatch = useDispatch();
  const constraint = useSelector(constraintSelector);
  if (constraint == null) {
    return <div>No constraint selected</div>;
  }

  const { coords, minMines, maxMines } = constraint;
  const cellCount = coords.length;
  

  const clearConstraint = () => {
    coords.forEach(coordinate => fire<ClearCellAction>(dispatch, "CLEAR_CELL", {coordinate})());
  }

  const flagConstraint = () => {
    coords.forEach(coordinate =>
      fire<FlagCellAction>(dispatch, "FLAG_CELL", { coordinate })()
    );
  };

  return (
    <div>
      <div>Cells: {cellCount}</div>
      <div>
        Mines: {minMines} - {maxMines}
      </div>
      <button disabled={maxMines > 0} onClick={clearConstraint}>Clear</button>
      <button disabled={maxMines < cellCount} onClick={flagConstraint}>Flag</button>
    </div>
  );
};

export default Component;
