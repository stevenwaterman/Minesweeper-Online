import React from "react";
import { useSelector, Selector } from "../../utils/Selector";
import { Constraint } from "../../utils/Constraint";
import "./Styles.scss";
import { Color } from "csstype";

export type Props = {
  constraintName: string;
  constraintsSelector: Selector<Array<Constraint | null>>;
  colorSelector: (constraints: Constraint[]) => Color;
};

function getConstraintComplex(constraint: Constraint) {
  const { coords, minMines, maxMines } = constraint;
  const cellCount = coords.length;

  const cellsString = `Cell${cellCount > 1 ? "s" : ""}`;
  const exact = minMines === maxMines;
  const minesCount = `${minMines} ${exact ? "" : `to ${maxMines}`}`;
  const minesString = maxMines === 1 ? "Mine" : "Mines";
  return (
    <div className="constraintInfo">
      <div>{`${cellCount} ${cellsString}`}</div>
      <div>{`${minesCount} ${minesString}`}</div>
    </div>
  );
}

function getConstraintInfo(constraints: Constraint[]) {
  if (constraints.length === 0) {
    return <div className="constraintEmpty">Nothing selected</div>;
  }
  return getConstraintComplex(constraints[0]);
}

const Component: React.FC<Props> = ({
  constraintName,
  constraintsSelector,
  colorSelector
}: Props) => {
  const constraints = useSelector(constraintsSelector).filter(
    c => c !== null
  ) as Constraint[];

  return (
    <div
      className="constraint"
      style={{ background: colorSelector(constraints) }}
    >
      <div className="constraintName">{constraintName}</div>
      {getConstraintInfo(constraints)}
    </div>
  );
};

export default Component;
