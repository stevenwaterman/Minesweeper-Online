import React from "react";
import { useSelector } from "../../utils/Selector";
import ComplexConstraint from "./ComplexConstraint";
import "./Styles.scss";
import {
  selectUnknownCells,
  selectRemainingMineCount
} from "../../board/Reducer";
import { selectComplexConstraints } from "../Selectors";
import {
  selectShowBoardConstraint,
  selectShowComplexConstraints
} from "../../options/Reducer";

const Component: React.FC = () => {
  const constraints = useSelector(selectComplexConstraints);

  const unknownCells = useSelector(selectUnknownCells);
  const mineCount = useSelector(selectRemainingMineCount);
  const wholeBoardConstraint = {
    coords: unknownCells,
    minMines: mineCount,
    maxMines: mineCount
  };

  const showBoardConstraint = useSelector(selectShowBoardConstraint);
  const showAnything = useSelector(selectShowComplexConstraints);
  if (!showAnything) return null;

  return (
    <div className="constraintList">
      <div className="listHeader">Complex Constraints:</div>
      <div className="listBody">
        {showBoardConstraint && wholeBoardConstraint.maxMines > 0 ? (
          <ComplexConstraint constraint={wholeBoardConstraint} />
        ) : null}
        {constraints.map((constraint, idx) => (
          <ComplexConstraint
            key={JSON.stringify(constraint)}
            constraint={constraint}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
};

export default Component;
