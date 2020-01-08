import React from "react";
import { useDispatch } from "../utils/Actions";
import { SetOptionAction } from "../options/Reducer";
import { selectHasWon } from "../board/Reducer";
import { useSelector } from "../utils/Selector";

const Component: React.FC = () => {
  const dispatch = useDispatch<SetOptionAction>();
  const won: boolean = useSelector(selectHasWon);
  const onMouseEnter = () => {
    dispatch({ type: "SET_OPTION", option: "showCoords", value: true });
  };
  const onMouseLeave = () => {
    dispatch({ type: "SET_OPTION", option: "showCoords", value: false });
  };
  if (won) {
    return <h1>Success!</h1>;
  } else {
    return <h1 onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      Minesweeper
    </h1>;
  }
};

export default Component;
