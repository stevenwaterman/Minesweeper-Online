import { useSelector } from "../utils/Selector";
import React from "react";
import { Cell } from "../utils/Cells";
import { selectHoveringCells } from "../overlay/Reducer";

const Component: React.FC = () => {
  const hoveringCells = useSelector(selectHoveringCells);

  if (hoveringCells == null) {
    return <div>No Constraint Selected</div>;
  }
  const unknown: Cell[] = hoveringCells.filter(cell => !cell.cellStateKnown);
  const unknownCount = unknown.length;
  const mineCount = unknown.filter(cell => cell.cellState === "X").length;

  return (
    <div>
      <h2>Constraint Info:</h2>
      <p>Unknowns: {unknownCount}</p>
      <p>Mines: {mineCount}</p>
      {unknownCount === mineCount ? <p>Can Flag</p> : null}
      {mineCount === 0 ? <p>Can Clear</p> : null}
    </div>
  );
};

export default Component;
