import React from "react";
import "./Styles.scss";
import { Color } from "csstype";

type Props = {
  highlighted: boolean;
  color: Color;
};

const Component: React.FC<Props> = ({ highlighted, color }) => {
  if (highlighted) {
    return <div style={{background: color}} />;
  }
  return <div />;
};

export default Component;
