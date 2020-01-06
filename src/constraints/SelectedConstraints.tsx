import { useSelector } from "../utils/Selector";
import ConstraintInfo from "./ConstraintInfo";
import {
  selectFirst,
  selectSecond,
  selectAnySelected,
  ClearSelectedConstraintsAction
} from "./Reducer";
import React from "react";
import { useDispatch } from "react-redux";
import { fire } from "../utils/Actions";

const Component: React.FC = () => {
  const anySelected = useSelector(selectAnySelected);

  const dispatch = useDispatch();

  return (
    <div>
      <div>Constraint 1</div>
      <ConstraintInfo constraintSelector={selectFirst} />

      <div>Constraint 2</div>
      <ConstraintInfo constraintSelector={selectSecond} />

      <button
        disabled={!anySelected}
        onClick={fire<ClearSelectedConstraintsAction>(
          dispatch,
          "CLEAR_SELECTED_CONSTRAINTS",
          {}
        )}
      >
        Clear Selection
      </button>
    </div>
  );
};

export default Component;
