import React from "react";
import "./Styles.scss";
import { selectWidth, selectHeight, selectCoords } from "../board/Reducer";
import { useSelector, Selector } from "../utils/Selector";
import { Color } from "csstype";
import { Constraint, inConstraint, canClear, canFlag } from "../utils/Constraint";
import { gridStyle } from "../utils/Styles";
import { Coordinate } from "../utils/Cells";

export function targetColor(constraints: Constraint[], coordinate: Coordinate): Color {
  if (constraints.some(c => canClear(c) && inConstraint(c, ...coordinate)))
    return "#0f05";

  if (constraints.some(c => canFlag(c) && inConstraint(c, ...coordinate)))
    return "#f005";

  if (constraints.some(c => inConstraint(c, ...coordinate))) return "#0003";
  else return "transparent";
}

export function firstColor(constraints: Constraint[], coordinate: Coordinate): Color {
  if (constraints.some(c => inConstraint(c, ...coordinate))) return "#f905";
  else return "transparent";
}

export function secondColor(constraints: Constraint[], coordinate: Coordinate): Color {
  if (constraints.some(c => inConstraint(c, ...coordinate))) return "#09f5";
  else return "transparent";
}

type Props = {
  selectConstraints: Selector<Constraint[]>;
  colorSelector: (constraints: Constraint[], coordinate: Coordinate) => Color;
};

const Component: React.FC<Props> = ({
  selectConstraints,
  colorSelector
}: Props) => {
  const constraints = useSelector(selectConstraints);
  const width = useSelector(selectWidth);
  const height = useSelector(selectHeight);
  const coords = useSelector(selectCoords);
  if (constraints.length === 0) return null;

  return (
    <div className="overlayContainer" style={gridStyle(width, height)}>
      {coords.map(([x, y]) => (
        <div
          key={`${x},${y}`}
          style={{ background: colorSelector(constraints, [x, y]) }}
        />
      ))}
    </div>
  );
};

export default Component;
