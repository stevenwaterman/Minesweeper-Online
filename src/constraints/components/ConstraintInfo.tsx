import React from "react";
import { useSelector, Selector } from "../../utils/Selector";
import { Constraint } from "../../utils/Constraint";
import "./Styles.scss";
import { Color } from "csstype";

export type Props = {
  constraintName: string;
  constraintSelector: Selector<Constraint | null>;
  colorSelector: (constraint: Constraint) => Color;
};

const Component: React.FC<Props> = ({
  constraintName,
  constraintSelector,
  colorSelector,
}: Props) => {
  const constraint = useSelector(constraintSelector);
  if (constraint === null) {
    return (
      <>
        <div className="constraint">
          <div className="constraintName">{constraintName}</div>
          <div className="constraintEmpty">No constraint selected</div>
        </div>
      </>
    );
  }

  const { coords, minMines, maxMines } = constraint;
  const cellCount = coords.length;

  const cellsString = `Cell${cellCount > 1 ? "s" : ""}`;
  const exact = minMines === maxMines;
  const minesCount = `${minMines} ${exact ? "" : `to ${maxMines}`}`;
  const minesString = maxMines === 1 ? "Mine" : "Mines";

  return (
    <div
      className="constraint"
      style={{ background: colorSelector(constraint) }}
    >
      <div className="constraintName">{constraintName}</div>
      <div className="constraintInfo">
        {`${cellCount} ${cellsString}`}
      </div>
      <div className="constraintInfo">
        {`${minesCount} ${minesString}`}
      </div>
    </div>
  );
};

export default Component;
