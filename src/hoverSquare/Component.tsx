import { useSelector } from "../utils/Selector";
import { Coordinate } from "../utils/Cells";
import React from "react";
import "./Styles.scss";
import { selectIsHighlighted } from "../overlay/Reducer";
import { selectCellStateKnown } from "../board/Reducer";

type Props = {
  coordinate: Coordinate;
};

const Component: React.FC<Props> = ({ coordinate }) => {
  const highlighted = useSelector(selectIsHighlighted, coordinate);
  const stateKnown = useSelector(selectCellStateKnown, coordinate);

  if (highlighted && !stateKnown) {
    return <div className="highlighted" />;
  }
  return <div />;
};

export default Component;
