import React from "react";
import { useDispatch } from "../utils/Actions";
import { Coordinate } from "../utils/Cells";
import { Matrix } from "../utils/Lists";
import { LoadBoardAction } from "../board/Reducer";
import "./Styles.scss";

type Props = {
  name: string;
  save: {
    mines: Matrix<0 | 1>;
    start: Coordinate;
  };
};

const Component: React.FC<Props> = ({ name, save }) => {
  const dispatch = useDispatch<LoadBoardAction>();

  return (
    <div>
      <button onClick={() => dispatch({ type: "LOAD_BOARD", ...save })}>
        {name}
      </button>
    </div>
  );
};

export default Component;
