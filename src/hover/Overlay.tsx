import React from "react";
import "./Styles.scss";
import { selectWidth, selectHeight, selectCells } from "../board/Reducer";
import { useSelector } from "../utils/Selector";
import HoverSquare from "./HoverSquare";
import { RootState } from "../app/Reducer";
import { Constraint } from "../constraints/Reducer";
import { Color } from "csstype";
import { Coordinate } from "../utils/Cells";

type Props = {
  selectConstraintContains: (state: RootState, coordinate: Coordinate) => boolean,
  color: Color
}

const Component: React.FC<Props> = ({selectConstraintContains, color}: Props) => {
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
        row.map((_, y) => (
          <HoverSquare isHighlighted={(state: RootState) => selectConstraintContains(state, [x,y])} color={color}/>
        ))
      )}
    </div>
  );
};

export default Component;
