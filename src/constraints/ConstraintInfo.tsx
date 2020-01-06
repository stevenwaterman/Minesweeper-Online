import React from "react";
import { useSelector, Selector } from "../utils/Selector";
import { Constraint } from "../utils/Constraint";

export type Props = {
  constraintSelector: Selector<Constraint | null>;
};

const Component: React.FC<Props> = ({ constraintSelector }: Props) => {
  const constraint = useSelector(constraintSelector);
  if (constraint == null) {
    return <div>No constraint selected</div>;
  }

  const { cells, minMines, maxMines } = constraint;
  const cellCount = cells.length;

  return (
    <div>
      <div>Cells: {cellCount}</div>
      <div>
        Mines: {minMines} - {maxMines}
      </div>
      {minMines <= 0 ? <button>Clear</button> : null}
      {maxMines === cellCount ? <button>Flag</button> : null}
    </div>
  );
};

export default Component;
