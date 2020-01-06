import React from "react";
import "./Styles.scss";
import { selectWidth, selectHeight, selectCells } from "../board/Reducer";
import { useSelector, Selector } from "../utils/Selector";
import HoverSquare from "./HoverSquare";
import { Color } from "csstype";
import { Constraint, constraintContains } from "../utils/Constraint";

type Props = {
  selectConstraint: Selector<Constraint | null>,
  color: Color
}

const Component: React.FC<Props> = ({selectConstraint, color}: Props) => {
  const width = useSelector(selectWidth);
  const height = useSelector(selectHeight);
  const cells = useSelector(selectCells);

  const constraint = useSelector(selectConstraint);
  if(constraint === null) return null;

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
          <HoverSquare highlighted={constraintContains(constraint, x, y)} color={color}/>
        ))
      )}
    </div>
  );
};

export default Component;
