import React from "react";
import "./Styles.scss";
import {
  selectWidth,
  selectHeight,
  selectCoords
} from "../board/Reducer";
import { useSelector, Selector } from "../utils/Selector";
import HoverSquare from "./HoverSquare";
import { Color } from "csstype";
import { Constraint, constraintContains } from "../utils/Constraint";

type Props = {
  selectConstraint: Selector<Constraint | null>;
  colorSelector: (constraint: Constraint) => Color;
};

const Component: React.FC<Props> = ({
  selectConstraint,
  colorSelector
}: Props) => {
  const constraint = useSelector(selectConstraint);
  const width = useSelector(selectWidth);
  const height = useSelector(selectHeight);
  const coords = useSelector(selectCoords);
  if (constraint === null) return null;

  return (
    <div
      className="overlayContainer"
      style={{
        gridTemplateColumns: `repeat(${width}, 25px)`,
        gridTemplateRows: `repeat(${height}, 25px)`
      }}
    >
      {coords.map(([x, y]) => (
        <HoverSquare
          key={`${x},${y}`}
          highlighted={constraintContains(constraint, x, y)}
          color={colorSelector(constraint)}
        />
      ))}
    </div>
  );
};

export default Component;
