import { useSelector } from "../utils/Selector";
import { selectCellState, selectCellStateKnown } from "../board/Reducer";
import { Coordinate } from "../utils/Cells";
import React from "react";
import "./Styles.scss";

type Props = {
  coordinate: Coordinate;
};

const Component: React.FC<Props> = ({ coordinate }) => {
  const state = useSelector(selectCellState, coordinate);
  const stateKnown = useSelector(selectCellStateKnown, coordinate);

  return <div className="cell">{stateKnown ? state : "."}</div>;
};

export default Component;
