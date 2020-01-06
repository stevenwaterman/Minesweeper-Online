import { useArgSelector } from "../utils/Selector";
import {
  selectCellState,
  selectCellStateKnown,
  selectConstraint
} from "./Reducer";
import { Coordinate } from "../utils/Cells";
import React from "react";
import "./Styles.scss";
import {
  SetHoverConstraintAction,
  SelectConstraintAction,
} from "../constraints/Reducer";
import { useDispatch } from "../utils/Actions";

type Props = {
  coordinate: Coordinate;
};

const Component: React.FC<Props> = props => {
  const state = useArgSelector(selectCellState, props);
  const stateKnown = useArgSelector(selectCellStateKnown, props);
  const constraint = useArgSelector(selectConstraint, props);

  const dispatch = useDispatch<SetHoverConstraintAction | SelectConstraintAction>();
  
  const style: React.CSSProperties = {};
  if (constraint !== null) style.cursor = "pointer";
  if (!stateKnown) style.background = "#dddddd";

  return (
    <div
      className="cell"
      style={style}
      onPointerEnter={constraint === null ? undefined : () => dispatch({type: "SET_HOVER_CONSTRAINT", constraint })}
      onPointerLeave={constraint === null ? undefined : () => dispatch({type: "SET_HOVER_CONSTRAINT", constraint:null})}
      onClick={constraint === null ? undefined : () => dispatch({type: "SELECT_CONSTRAINT", constraint })}
    >
      {stateKnown ? state : ""}
    </div>
  );
};

export default Component;
