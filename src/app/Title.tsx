import React from "react";
import { useDispatch } from "../utils/Actions";
import { SetOptionAction } from "../options/Reducer";

const Component: React.FC = () => {
  const dispatch = useDispatch<SetOptionAction>();
  const onMouseEnter = () => {
    dispatch({ type: "SET_OPTION", option: "showCoords", value: true });
  };
  const onMouseLeave = () => {
    dispatch({ type: "SET_OPTION", option: "showCoords", value: false });
  };
  return (
    <h1 onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      Minesweeper
    </h1>
  );
};

export default Component;
