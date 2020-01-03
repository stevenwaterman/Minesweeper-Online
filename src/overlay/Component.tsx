import React from "react";
import "./Styles.scss";
import { selectWidth, selectHeight, selectCells } from "../board/Reducer";
import { useSelector } from "../utils/Selector";
import HoverSquare from "../hoverSquare/Component";

const Component: React.FC = () => {
  const width = useSelector(selectWidth);
  const height = useSelector(selectHeight);
  const cells = useSelector(selectCells);

  return (
    <div
      className="overlayContainer"
      style={{
        gridTemplateRows: `repeat(${height}, 25px)`,
        gridTemplateColumns: `repeat(${width}, 25px)`
      }}
    >
      {cells.flatMap((row, x) =>
        row.map((_, y) => <HoverSquare coordinate={[x, y]} />)
      )}
    </div>
  );
};

export default Component;
