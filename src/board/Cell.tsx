import { useSelector } from "../utils/Selector";
import {
  selectCellState,
  selectCellStateKnown,
  createClearCellAction,
  selectConstraint
} from "./Reducer";
import { Coordinate, CellState } from "../utils/Cells";
import React from "react";
import "./Styles.scss";
import { useDispatch } from "react-redux";
import { createSetHoverConstraintAction, createSelectConstraintAction } from "../constraints/Reducer";

type Props = {
  coordinate: Coordinate;
};

const Component: React.FC<Props> = ({ coordinate }) => {
  const state = useSelector(selectCellState, coordinate) as CellState;
  const stateKnown = useSelector(selectCellStateKnown, coordinate) as boolean;  
  const constraint = useSelector(selectConstraint, coordinate)
  
  const dispatch = useDispatch();
  const setHover = () => {
    if(constraint != null){
      dispatch(createSetHoverConstraintAction({ constraint }));
    }
  }
  const clearHover = () => dispatch(createSetHoverConstraintAction({ constraint: null }));
  const onClick = () => {
    if(constraint != null){
      dispatch(createSelectConstraintAction({constraint}));
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
