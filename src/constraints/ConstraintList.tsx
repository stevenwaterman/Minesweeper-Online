import React from "react";
import { useSelector } from "../utils/Selector";
import { selectComplexConstraints } from "./Reducer";
import ComplexConstraint from "./ComplexConstraint";
import "./Styles.scss";

const Component: React.FC = () => {
  const constraints = useSelector(selectComplexConstraints);

  return (
    <div className="constraintList">
      <div className="listHeader">Complex Constraints:</div>
      <div className="listBody">
        {constraints.map(constraint => (
          <ComplexConstraint constraint={constraint} />
        ))}
      </div>
    </div>
  );
};

export default Component;
