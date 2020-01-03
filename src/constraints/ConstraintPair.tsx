import { useSelector } from "../utils/Selector";
import ConstraintInfo from "./ConstraintInfo";
import { selectFirstSelectedConstraint, selectAnyConstraintSelected } from "./Reducer";
import React from "react";

const Component: React.FC = () => {
    const anySelected = useSelector(selectAnyConstraintSelected);

  return (
    <div>
      <div>Constraint 1</div>
      <ConstraintInfo selector={state => selectFirstSelectedConstraint(state, 1)} />

      <div>Constraint 2</div>
      <ConstraintInfo selector={state => selectFirstSelectedConstraint(state, 2)} />

        {anySelected ? <button>Clear Selection</button> : null}
    </div>
  );
};

export default Component;
