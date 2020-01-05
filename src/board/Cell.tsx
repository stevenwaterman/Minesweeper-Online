import { useSelector } from "../utils/Selector";
import {
  selectCellState,
  selectCellStateKnown,
  selectConstraint
} from "./Reducer";
import { Coordinate } from "../utils/Cells";
import React from "react";
import "./Styles.scss";
import { useDispatch } from "react-redux";
import { fire } from "../utils/Actions";
import { SetHoverConstraintAction, SelectConstraintAction } from "../constraints/Reducer";

type Props = {
  coordinate: Coordinate;
};

const Component: React.FC<Props> = ({ coordinate}) => {
  const [x,y] = coordinate;
  const state = useSelector(selectCellState, [x,y], []);
  const stateKnown = useSelector(selectCellStateKnown, [x,y], []);
  const constraint = useSelector(selectConstraint, x,y)
  
  const dispatch = useDispatch();
  const setHover = () => {
    if(constraint != null){
      fire<SetHoverConstraintAction>(dispatch, "SET_HOVER_CONSTRAINT", {constraint})
    }
  }
  const clearHover = () => fire<SetHoverConstraintAction>(dispatch, "SET_HOVER_CONSTRAINT", { constraint: null });
  const onClick = () => {
    if(constraint != null){
      fire<SelectConstraintAction>(dispatch, "SELECT_CONSTRAINT", {constraint});
    }
  }

  return (
    <div
      className="cell" style={stateKnown ? {} : {cursor: "pointer"}}
      onPointerEnter={setHover}
      onPointerLeave={clearHover}
      onClick={onClick}
    >
      {stateKnown ? state : "."}
    </div>
  );
};

export default Component;
