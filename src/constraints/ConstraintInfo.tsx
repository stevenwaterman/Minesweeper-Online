import React from "react";
import { Constraint } from "./Reducer";
import { RootState } from "../app/Reducer";
import { useSelector } from "../utils/Selector";

export type Props = {
  selector: (state: RootState) => Constraint | null
};

const Component: React.FC<Props> = ({ selector }: Props) => {
  const constraint = useSelector(selector)
  if (constraint == null) return <div>No constraint selected</div>;

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
