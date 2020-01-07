import ConstraintInfo from "./ConstraintInfo";
import "./Styles.scss";
import React from "react";
import { selectTarget, selectFirst, selectSecond } from "../Selectors";
import {
  Constraint,
  canClearConstraint,
  canFlagConstraint
} from "../../utils/Constraint";

export const targetColorSelector = (constraint: Constraint) => {
  if (canClearConstraint(constraint)) return "#0f05";
  if (canFlagConstraint(constraint)) return "#f005";
  return "#0005";
};

export const firstColorSelector = (_: Constraint) => "#f905";

export const secondColorSelector = (_: Constraint) => "#09f5";

const Component: React.FC = () => {
  return (
    <div className="selectedConstraints">
      <ConstraintInfo
        constraintName="Constraint 1"
        constraintSelector={selectFirst}
        colorSelector={firstColorSelector}
      />
      <ConstraintInfo
        constraintName="Constraint 2"
        constraintSelector={selectSecond}
        colorSelector={secondColorSelector}
      />
      <ConstraintInfo
        constraintName="Target"
        constraintSelector={selectTarget}
        colorSelector={targetColorSelector}
      />
    </div>
  );
};

export default Component;
