import { useSelector } from "../utils/Selector";
import ConstraintInfo from "./ConstraintInfo";
import {
  selectFirst,
  selectSecond,
  selectAnySelected,
  selectHover,
  ClearSelectedConstraintsAction,
  selectCanSubtract,
  selectCanReduce,
  selectCanMerge,
  SubtractConstraintsAction,
  ReduceConstraintsAction,
  MergeConstraintsAction
} from "./Reducer";
import React from "react";
import { useDispatch } from "../utils/Actions";

const Component: React.FC = () => {
  const anySelected = useSelector(selectAnySelected);
  const canSubtract = useSelector(selectCanSubtract);
  const canReduce = useSelector(selectCanReduce);
  const canMerge = useSelector(selectCanMerge);

  const dispatch = useDispatch<ClearSelectedConstraintsAction | SubtractConstraintsAction | ReduceConstraintsAction | MergeConstraintsAction>();

  return (
    <div>
      <div>
        <b>Hovering</b>
      </div>
      <ConstraintInfo constraintSelector={selectHover} />

      <br />

      <div>
        <b>Orange</b>
      </div>
      <ConstraintInfo constraintSelector={selectFirst} />

      <br />

      <div>
        <b>Blue</b>
      </div>
      <ConstraintInfo constraintSelector={selectSecond} />

      <br />

      <button
        disabled={!anySelected}
        onClick={() =>
          dispatch({
            type: "CLEAR_SELECTED_CONSTRAINTS"
          })
        }
      >
        Deselect
      </button>
      <button
        disabled={!canSubtract}
        onClick={() =>
          dispatch({
            type: "SUBTRACT_CONSTRAINTS"
          })
        }
      >
        Subtract
      </button>
      <button
        disabled={!canReduce}
        onClick={() =>
          dispatch({
            type: "REDUCE_CONSTRAINTS"
          })
        }
      >
        Reduce
      </button>
      <button
        disabled={!canMerge}
        onClick={() =>
          dispatch({
            type: "MERGE_CONSTRAINTS"
          })
        }
      >
        Merge
      </button>
    </div>
  );
};

export default Component;
