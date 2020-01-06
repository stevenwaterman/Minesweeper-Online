import { useSelector } from "../utils/Selector";
import "./Styles.scss";
import {
  selectAnySelected,
  ClearSelectedConstraintsAction,
  selectCanSubtract,
  selectCanReduce,
  selectCanMerge,
  SubtractConstraintsAction,
  OverlapConstraintsAction,
  MergeConstraintsAction,
  WholeBoardConstraint,
  selectHasWholeBoardConstraint
} from "./Reducer";
import React from "react";
import { useDispatch } from "../utils/Actions";
import ConstraintButton from "../constraints/ConstraintButton";
import { selectUnknownCells, selectRemainingMineCount } from "../board/Reducer";

const Component: React.FC = () => {
  const canDeselect = useSelector(selectAnySelected);
  const canSubtract = useSelector(selectCanSubtract);
  const canOverlap = useSelector(selectCanReduce);
  const canMerge = useSelector(selectCanMerge);
  const canAddWholeBoardConstraint = !useSelector(
    selectHasWholeBoardConstraint
  );

  const dispatch = useDispatch<
    | ClearSelectedConstraintsAction
    | SubtractConstraintsAction
    | OverlapConstraintsAction
    | MergeConstraintsAction
    | WholeBoardConstraint
  >();

  const deselect = () => dispatch({ type: "CLEAR_SELECTED_CONSTRAINTS" });
  const subtract = () => dispatch({ type: "SUBTRACT_CONSTRAINTS" });
  const overlap = () => dispatch({ type: "OVERLAP_CONSTRAINTS" });
  const merge = () => dispatch({ type: "MERGE_CONSTRAINTS" });

  const unknownCells = useSelector(selectUnknownCells);
  const mineCount = useSelector(selectRemainingMineCount);
  const addWholeBoardConstraint = () =>
    dispatch({
      type: "WHOLE_BOARD_CONSTRAINT",
      constraint: {
        coords: unknownCells,
        minMines: mineCount,
        maxMines: mineCount
      }
    });

  return (
    <div className="constraintActions">
      <ConstraintButton
        enabled={canDeselect}
        action={deselect}
        text="Deselect"
      />
      <ConstraintButton
        enabled={canSubtract}
        action={subtract}
        text="Subtract"
      />
      <ConstraintButton enabled={canOverlap} action={overlap} text="Overlap" />
      <ConstraintButton enabled={canMerge} action={merge} text="Merge" />
      <ConstraintButton
        enabled={canAddWholeBoardConstraint}
        action={addWholeBoardConstraint}
        text="Board Constraint"
      />
    </div>
  );
};

export default Component;
