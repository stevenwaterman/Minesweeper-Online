import React from "react";
import { useDispatch } from "../utils/Actions";
import { LoadBoardAction } from "../board/Reducer";
import "./Styles.scss";
import { Save } from "./LoadPanel";

type Props = {
  name: string;
  save: Save
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
