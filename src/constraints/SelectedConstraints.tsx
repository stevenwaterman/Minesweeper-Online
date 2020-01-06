import { useSelector } from "../utils/Selector";
import ConstraintInfo from "./ConstraintInfo";
import {
  selectFirst,
  selectSecond,
  selectAnySelected,
  selectHover
} from "./Reducer";
import React from "react";
import { useDispatch } from "react-redux";

const Component: React.FC = () => {
  const anySelected = useSelector(selectAnySelected);

  const dispatch = useDispatch();

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
        Clear Selection
      </button>
    </div>
  );
};

export default Component;
