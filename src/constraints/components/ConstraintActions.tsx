import { useSelector } from "../../utils/Selector";
import "./Styles.scss";
import React from "react";
import { useDispatch } from "../../utils/Actions";
import ConstraintButton from "./ActionButton";
import { selectAnySelected, selectSubtract, selectOverlap, selectMerge } from "../Selectors";
import { ClearSelectedConstraintsAction, SetTargetConstraintAction, AddConstraintAction } from "../Actions";

const Component: React.FC = () => {
  const canDeselect = useSelector(selectAnySelected);

  const dispatch = useDispatch<
    | ClearSelectedConstraintsAction
    | SetTargetConstraintAction
    | AddConstraintAction
  >();

  const deselect = () => {
    if(!canDeselect) return;
    dispatch({ type: "CLEAR_SELECTED_CONSTRAINTS" });
  }

  const subtractProduces = useSelector(selectSubtract);
  const overlapProduces = useSelector(selectOverlap);
  const mergeProduces = useSelector(selectMerge);

  return (
    <div className="constraintActions">
      <button onClick={deselect} className={`constraintButton${canDeselect ? " enabled" : ""}`}>Deselect</button>
      <ConstraintButton constraint={subtractProduces} text="Subtract" />
      <ConstraintButton constraint={overlapProduces} text="Overlap" />
      <ConstraintButton constraint={mergeProduces} text="Merge" />
    </div>
  );
};

export default Component;
