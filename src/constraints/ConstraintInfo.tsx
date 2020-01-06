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

  const { coords, minMines, maxMines } = constraint;
  const cellCount = coords.length;

  return (
    <div>
      <div>Cells: {cellCount}</div>
      <div>
        Mines: {minMines} - {maxMines}
      </div>
    </div>
  );
};

export default Component;
