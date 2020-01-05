import React from "react";
import "./Styles.scss";
import { selectWidth, selectHeight, selectCells } from "./Reducer";
import { useSelector } from "../utils/Selector";
import Cell from "./Cell";

const Component: React.FC = () => {
  const width = useSelector(selectWidth, [], []);
  const height = useSelector(selectHeight, [], []);
  const cells = useSelector(selectCells);

  return (
    <div
      className="boardContainer"
      style={{
        gridTemplateRows: `repeat(${height}, 25px)`,
        gridTemplateColumns: `repeat(${width}, 25px)`
      }}
    >
      {cells.flatMap((row, x) => row.map((_, y) => <Cell coordinate={[x, y]} />))}
    </div>
  );
};

export default Component;
