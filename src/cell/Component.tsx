import { useSelector } from "../utils/Selector";
import {
  selectCellState,
  selectCellStateKnown,
  createClearCellAction
} from "../board/Reducer";
import { Coordinate } from "../utils/Cells";
import React from "react";
import "./Styles.scss";
import { useDispatch } from "react-redux";
import { createSetHoverAction } from "../overlay/Reducer";

type Props = {
  coordinate: Coordinate;
};

const Component: React.FC<Props> = ({ coordinate }) => {
  const state = useSelector(selectCellState, coordinate);
  const stateKnown = useSelector(selectCellStateKnown, coordinate);
  const dispatch = useDispatch();

  const setHover = () =>
    dispatch(createSetHoverAction({ location: coordinate }));
  const clearHover = () => dispatch(createSetHoverAction({ location: null }));
  const onClick = () => dispatch(createClearCellAction({ coordinate }));

  return (
    <div
      className="cell"
      onPointerEnter={setHover}
      onPointerLeave={clearHover}
      onClick={onClick}
    >
      {stateKnown ? state : "."}
    </div>
  );
};

export default Component;
