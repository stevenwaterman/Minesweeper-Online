import React from "react";
import "./Styles.scss";
import { useSelector } from "../utils/Selector";
import { selectShowCoords } from "../options/Reducer";

type Props = {
  index: number;
};

const Component: React.FC<Props> = ({ index }) => {
  const enabled = useSelector(selectShowCoords);

  let className = "cell";
  if (enabled) {
    className += " enabled";
  }
  return <div className={className}>{index}</div>;
};

export default Component;
