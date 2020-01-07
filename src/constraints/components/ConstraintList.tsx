import React from "react";
import { useSelector } from "../../utils/Selector";
import ComplexConstraint from "./ComplexConstraint";
import "./Styles.scss";
import { selectUnknownCells, selectRemainingMineCount } from "../../board/Reducer";
import { selectComplexConstraints } from "../Selectors";

const Component: React.FC = () => {
  const constraints = useSelector(selectComplexConstraints);

  const unknownCells = useSelector(selectUnknownCells);
  const mineCount = useSelector(selectRemainingMineCount);
  const wholeBoardConstraint = {
      coords: unknownCells,
      minMines: mineCount,
      maxMines: mineCount
  };

  return (
    <div className="constraintList">
      <div className="listHeader">Complex Constraints:</div>
      <div className="listBody">
        {wholeBoardConstraint.maxMines > 0 ? (<ComplexConstraint constraint={wholeBoardConstraint} />) : null}
        {constraints.map((constraint, idx) => (
          <ComplexConstraint key={JSON.stringify(constraint)} constraint={constraint} index={idx} />
        ))}
      </div>
    </div>
  );
};

export default Component;
