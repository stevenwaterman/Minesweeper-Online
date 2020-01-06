import ConstraintInfo from "./ConstraintInfo";
import "./Styles.scss";
import {
  selectFirst,
  selectSecond,
  selectHover} from "./Reducer";
import React from "react";

const Component: React.FC = () => {
  return (
      <div className="selectedConstraints">
        <ConstraintInfo
          constraintName="Hovering"
          constraintSelector={selectHover}
        />
        <ConstraintInfo
          constraintName="Orange"
          constraintSelector={selectFirst}
        />
        <ConstraintInfo
          constraintName="Blue"
          constraintSelector={selectSecond}
        />
      </div>
  );
};

export default Component;
