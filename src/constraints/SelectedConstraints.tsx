import { useSelector } from "../utils/Selector";
import ConstraintInfo from "./ConstraintInfo";
import { selectFirst, selectSecond, selectAnySelected } from "./Reducer";
import React from "react";

const Component: React.FC = () => {
    const anySelected = useSelector(selectAnySelected);

  return (
    <div>
      <div>Constraint 1</div>
      <ConstraintInfo selector={state => selectFirst(state)} />

      <div>Constraint 2</div>
      <ConstraintInfo selector={state => selectSecond(state)} />

        {anySelected ? <button>Clear Selection</button> : null}
    </div>
  );
};

export default Component;
