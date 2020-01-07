import React from "react";
import "./Styles.scss";
import { selectWidth, selectHeight, selectCoords } from "../board/Reducer";
import { useSelector, Selector } from "../utils/Selector";
import CoordsSquare from "./CoordsSquare";
import { Color } from "csstype";
import { Constraint, constraintContains } from "../utils/Constraint";


const Component: React.FC = () => {
  const width = useSelector(selectWidth);
  const height = useSelector(selectHeight);
  const coords = useSelector(selectCoords);

  return (
    <div
      className="coordsContainer"
      style={{
        gridTemplateColumns: `repeat(${width}, 40px)`,
        gridTemplateRows: `repeat(${height}, 40px)`
      }}
    >
      {coords.map(([x, y]) => (
        <CoordsSquare
          key={`${x},${y}`}
          coordinate={[x,y]}
        />
      ))}
    </div>
  );
};

export default Component;
