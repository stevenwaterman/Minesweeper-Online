import React from "react";
import "./Styles.scss";
import { selectWidth, selectHeight, selectCoords } from "../board/Reducer";
import { useSelector } from "../utils/Selector";
import CoordsSquare from "./CoordsSquare";
import { gridStyle } from "../utils/Styles";


const Component: React.FC = () => {
  const width = useSelector(selectWidth);
  const height = useSelector(selectHeight);
  const coords = useSelector(selectCoords);

  return (
    <div className="coordsContainer" style={gridStyle(width, height)}>
      {coords.map(([x,y], idx) => (
        <CoordsSquare key={`${x},${y}`} index={idx} />
      ))}
    </div>
  );
};

export default Component;
