import React from "react";
import "./Styles.scss";
import { Coordinate } from "../utils/Cells";
import { useSelector } from "../utils/Selector";
import { selectShowCoords } from "../options/Reducer";

type Props = {
  coordinate: Coordinate;
};

const Component: React.FC<Props> = ({ coordinate: [x, y] }) => {
  const enabled = useSelector(selectShowCoords);

  let className = "cell";
  if (enabled) {
    className += " enabled";
  }
  return <div className={className}>{`${x},${y}`}</div>;
};

export default Component;
