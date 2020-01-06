import { useSelector } from "../utils/Selector";
import ConstraintInfo from "./ConstraintInfo";
import "./Styles.scss";
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
import ConstraintButton from "../constraints/ConstraintButton";

const Component: React.FC = () => {
  const canDeselect = useSelector(selectAnySelected);
  const canSubtract = useSelector(selectCanSubtract);
  const canReduce = useSelector(selectCanReduce);
  const canMerge = useSelector(selectCanMerge);

  const dispatch = useDispatch<
    | ClearSelectedConstraintsAction
    | SubtractConstraintsAction
    | ReduceConstraintsAction
    | MergeConstraintsAction
  >();

  const deselect = () => dispatch({ type: "CLEAR_SELECTED_CONSTRAINTS" });
  const subtract = () => dispatch({ type: "SUBTRACT_CONSTRAINTS" });
  const reduce = () => dispatch({ type: "REDUCE_CONSTRAINTS" });
  const merge = () => dispatch({ type: "MERGE_CONSTRAINTS" });

  return <>
    <div className="selectedConstraints">
      <ConstraintInfo constraintName="Hovering" constraintSelector={selectHover} />
      <ConstraintInfo constraintName="Orange" constraintSelector={selectFirst} />
      <ConstraintInfo constraintName="Blue" constraintSelector={selectSecond} />
    </div>
    <div className="constraintActions">
      <ConstraintButton enabled={canDeselect} action={deselect} text="Deselect"/>
      <ConstraintButton enabled={canSubtract} action={subtract} text="Subtract"/>
      <ConstraintButton enabled={canReduce} action={reduce} text="Reduce"/>
      <ConstraintButton enabled={canMerge} action={merge} text="Merge"/>
    </div>
  </>;
};

export default Component;
