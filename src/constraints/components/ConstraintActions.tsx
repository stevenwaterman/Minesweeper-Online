import { useSelector } from "../../utils/Selector";
import "./Styles.scss";
import React from "react";
import { useDispatch } from "../../utils/Actions";
import ConstraintButton from "./ActionButton";
import { selectAnySelected, selectSubtract, selectOverlap, selectMerge } from "../Selectors";
import { ClearSelectedConstraintsAction, SetTargetConstraintsAction, AddConstraintsAction } from "../Actions";
import { selectShowSubtraction, selectShowOverlap, selectShowMerge } from "../../options/Reducer";
import { Constraint } from "../../utils/Constraint";

const Component: React.FC = () => {
  const canDeselect = useSelector(selectAnySelected);

  const dispatch = useDispatch<
    | ClearSelectedConstraintsAction
    | SetTargetConstraintsAction
    | AddConstraintsAction
  >();

  const deselect = () => {
    if(!canDeselect) return;
    dispatch({ type: "CLEAR_SELECTED_CONSTRAINTS" });
  }

  const subtractProduces = useSelector(selectSubtract);
  const overlapProduces = useSelector(selectOverlap);
  const mergeProduces = useSelector(selectMerge);

  const showSubtraction = useSelector(selectShowSubtraction);
  const showOverlap = useSelector(selectShowOverlap);
  const showMerge = useSelector(selectShowMerge);

  const subtracted = subtractProduces === null ? [] : [subtractProduces];
  const overlapped = overlapProduces.filter(c => c !== null) as Constraint[];
  const merged = mergeProduces === null ? [] : [mergeProduces];

  return (
    <div className="constraintActions">
      <button onClick={deselect} className={`constraintButton${canDeselect ? " enabled" : ""}`}>Deselect</button>
      {showSubtraction ? (<ConstraintButton constraints={subtracted} text="Subtract" />) : null}
      {showOverlap ? (<ConstraintButton constraints={overlapped} text="Overlap" />) : null }
      {showMerge ? (<ConstraintButton constraints={merged} text="Merge" />) : null }
    </div>
  );
};

export default Component;
