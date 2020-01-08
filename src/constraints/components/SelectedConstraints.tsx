import ConstraintInfo from "./ConstraintInfo";
import "./Styles.scss";
import React from "react";
import {
  selectTargets,
  selectSecondWrapped,
  selectFirstWrapped
} from "../Selectors";
import { Constraint, canClear, canFlag } from "../../utils/Constraint";
import { Color } from "csstype";

function targetColor(constraints: Constraint[]): Color {
  if (constraints.some(c => canClear(c))) return "#0f05";

  if (constraints.some(c => canFlag(c))) return "#f005";

  return "#ddd";
}

function firstColor(constraints: Constraint[]): Color {
  if (constraints.length === 0) return "#ddd";
  else return "#fc9";
}

function secondColor(constraints: Constraint[]): Color {
  if (constraints.length === 0) return "#ddd";
  else return "#9cf";
}

const Component: React.FC = () => {
  return (
    <div className="selectedConstraints">
      <ConstraintInfo
        constraintName="Constraint 1"
        constraintsSelector={selectFirstWrapped}
        colorSelector={firstColor}
      />
      <ConstraintInfo
        constraintName="Constraint 2"
        constraintsSelector={selectSecondWrapped}
        colorSelector={secondColor}
      />
      <ConstraintInfo
        constraintName="Targets"
        constraintsSelector={selectTargets}
        colorSelector={targetColor}
      />
    </div>
  );
};

export default Component;
