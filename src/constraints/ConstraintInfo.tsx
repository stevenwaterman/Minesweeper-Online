import React from "react";
import { useSelector, Selector } from "../utils/Selector";
import { Constraint } from "../utils/Constraint";
import "./Styles.scss";

export type Props = {
  constraintName: string;
  constraintSelector: Selector<Constraint | null>;
};

const Component: React.FC<Props> = ({
  constraintName,
  constraintSelector
}: Props) => {
  const constraint = useSelector(constraintSelector);
  if (constraint == null) {
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

  const cellsString = `cell${cellCount > 1 ? "s" : ""}`;
  const exact = minMines === maxMines;
  const minesCount = `${minMines} ${exact ? "" : `to ${maxMines}`}`;
  const minesString = maxMines === 1 ? "mine" : "mines";

  return (
    <>
      <div className="constraint" style={{ background: "#ffcc99" }}>
        <div className="constraintName">{constraintName}</div>
        <div className="constraintInfo">
          {`${cellCount} ${cellsString} containing ${minesCount} ${minesString}`}{" "}
        </div>
      </div>
    </>
  );
};

export default Component;
