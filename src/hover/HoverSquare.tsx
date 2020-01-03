import { useSelector } from "../utils/Selector";
import { Coordinate } from "../utils/Cells";
import React from "react";
import "./Styles.scss";
import { selectCellStateKnown } from "../board/Reducer";
import { RootState } from "../app/Reducer";
import { Color } from "csstype";

type Props = {
  isHighlighted: (state: RootState) => boolean;
  color: Color;
};

const Component: React.FC<Props> = ({ isHighlighted, color }) => {
  const highlighted = useSelector(isHighlighted);

  if (highlighted) {
    return <div style={{color}} />;
  }
  return <div />;
};

export default Component;
