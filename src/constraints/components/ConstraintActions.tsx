import { useSelector } from "../../utils/Selector";
import "./Styles.scss";
import React from "react";
import { useDispatch } from "../../utils/Actions";
import ConstraintButton from "./ActionButton";
import { selectAnySelected, selectSubtract, selectReduce, selectMerge } from "../Selectors";
import { ClearSelectedConstraintsAction, SetTargetConstraintsAction, AddConstraintsAction } from "../Actions";
import { selectShowSubtraction, selectShowReduce, selectShowMerge } from "../../options/Reducer";
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
  const reduceProduces = useSelector(selectReduce);
  const mergeProduces = useSelector(selectMerge);

  const showSubtraction = useSelector(selectShowSubtraction);
  const showReduce = useSelector(selectShowReduce);
  const showMerge = useSelector(selectShowMerge);

  const subtracted = subtractProduces === null ? [] : [subtractProduces];
  const reduced = reduceProduces.filter(c => c !== null) as Constraint[];
  const merged = mergeProduces === null ? [] : [mergeProduces];

  return (
    <div className="constraintActions">
      <button onClick={deselect} className={`constraintButton${canDeselect ? " enabled" : ""}`}>Deselect</button>
      {showSubtraction ? (<ConstraintButton constraints={subtracted} text="Subtract" />) : null}
      {showReduce ? (<ConstraintButton constraints={reduced} text="Reduce" />) : null }
      {showMerge ? (<ConstraintButton constraints={merged} text="Merge" />) : null }
    </div>
  );
};

export default Component;
