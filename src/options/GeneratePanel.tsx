import React from "react";
import { useDispatch } from "../utils/Actions";
import { useSelector } from "../utils/Selector";
import { selectHeight, selectWidth, selectMineCount } from "../board/Reducer";
import "./Styles.scss";

const Component: React.FC = () => {
  const dispatch = useDispatch();
  const height = useSelector(selectHeight);
  const width = useSelector(selectWidth);
  const mines = useSelector(selectMineCount);

  return (
    <div className="panel">
      <div className="header">Generate:</div>
      <div>
        <label>
          Width:
          <input
            name="width"
            type="text"
            value={width}
            onChange={e => {
              const width = Number.parseInt(e.target.value);
              if (width != null) {
                dispatch({
                  type: "REGENERATE_BOARD",
                  width,
                  height,
                  mines
                });
              }
            }}
          />
        </label>
      </div>
      <div>
        <label>
          Height:
          <input
            name="height"
            type="text"
            value={height}
            onChange={e => {
              const height = Number.parseInt(e.target.value);
              if (height != null) {
                dispatch({
                  type: "REGENERATE_BOARD",
                  width,
                  height,
                  mines
                });
              }
            }}
          />
        </label>
      </div>
      <div>
        <label>
          Mines:
          <input
            name="mines"
            type="text"
            value={mines}
            onChange={e => {
              const mines = Number.parseInt(e.target.value);
              if (mines != null) {
                dispatch({
                  type: "REGENERATE_BOARD",
                  width,
                  height,
                  mines
                });
              }
            }}
          />
        </label>
      </div>
      <div>
        <button
          onClick={() =>
            dispatch({ type: "REGENERATE_BOARD", width, height, mines })
          }
        >
          Regenerate
        </button>
      </div>
    </div>
  );
};

export default Component;
