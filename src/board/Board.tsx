import React from "react";
import "./Styles.scss";
import { selectWidth, selectHeight, selectCoords } from "./Reducer";
import { useSelector } from "../utils/Selector";
import Cell from "./Cell";
import { gridStyle } from "../utils/Styles";

const Component: React.FC = () => {
  const width = useSelector(selectWidth);
  const height = useSelector(selectHeight);
  const coords = useSelector(selectCoords);

  return (
    <div
      className="boardContainer"
      style={gridStyle(width, height)}
    >
      {coords.map(([x,y]) => <Cell key={`${x},${y}`} coordinate={[x, y]} />)}
    </div>
  );
};

export default Component;
