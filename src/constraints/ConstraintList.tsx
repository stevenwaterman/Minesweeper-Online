import React from "react";
import { useSelector } from "../utils/Selector";
import { selectComplexConstraints } from "./Reducer";
import ComplexConstraint from "./ComplexConstraint";

const Component: React.FC = () => {
  const constraints = useSelector(selectComplexConstraints);

  return (
    <div>
      <div>Complex Constraints:</div>
      {constraints.map(constraint => (
        <ComplexConstraint constraint={constraint} />
      ))}
    </div>
  );
};

export default Component;
