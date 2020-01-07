import React from "react";
import { useSelector } from "../utils/Selector";
import {
  SetOptionAction,
  selectCheatMode,
  selectAutoZero,
  selectAutoClear,
  selectAutoFlag,
  selectShowRemaining
} from "./Reducer";
import { useDispatch } from "../utils/Actions";
import {
  selectWidth,
  selectHeight,
  selectMineCount,
  RegenerateBoardAction,
  LoadBoardAction
} from "../board/Reducer";
import { Coordinate } from "../utils/Cells";

const Component: React.FC = () => {
  const showRemaining = useSelector(selectShowRemaining);
  const cheatMode = useSelector(selectCheatMode);
  const autoZero = useSelector(selectAutoZero);
  const autoClear = useSelector(selectAutoClear);
  const autoFlag = useSelector(selectAutoFlag);
  const width = useSelector(selectWidth);
  const height = useSelector(selectHeight);
  const mines = useSelector(selectMineCount);
  const dispatch = useDispatch<
    SetOptionAction | RegenerateBoardAction | LoadBoardAction
  >();

  const save1 = {
    mines: [
      [false, false, false, true, false, false, false],
      [false, false, false, true, false, true, true],
      [false, false, false, false, false, false, true],
      [false, false, false, false, false, false, true],
      [false, true, false, false, true, false, false],
      [false, false, false, false, false, false, true],
      [false, true, true, true, true, false, true],
      [false, false, false, false, false, false, false],
      [false, false, false, false, true, false, true],
      [false, false, false, false, false, true, false],
      [false, false, false, false, true, true, false],
      [false, true, false, true, false, false, false],
      [false, true, false, false, false, false, true],
      [false, false, false, true, true, false, false]
    ],
    start: [0, 0] as Coordinate
  };

  return (
    <div>
      <div>
        <label>
          Show Remaining:
          <input
            name="showRemaining"
            type="checkbox"
            checked={showRemaining}
            onChange={e =>
              dispatch({
                type: "SET_OPTION",
                option: "showRemaining",
                value: e.target.checked
              })
            }
          />
        </label>
      </div>
      <div>
        <label>
          Cheat Mode:
          <input
            name="cheatMode"
            type="checkbox"
            checked={cheatMode}
            onChange={e =>
              dispatch({
                type: "SET_OPTION",
                option: "cheatMode",
                value: e.target.checked
              })
            }
          />
        </label>
      </div>
      <div>
        <label>
          Auto Zero:
          <input
            name="autoZero"
            type="checkbox"
            checked={autoZero}
            onChange={e =>
              dispatch({
                type: "SET_OPTION",
                option: "autoZero",
                value: e.target.checked
              })
            }
          />
        </label>
      </div>
      <div>
        <label>
          Auto Clear:
          <input
            name="autoClear"
            type="checkbox"
            checked={autoClear}
            onChange={e =>
              dispatch({
                type: "SET_OPTION",
                option: "autoClear",
                value: e.target.checked
              })
            }
          />
        </label>
      </div>
      <div>
        <label>
          Auto Flag:
          <input
            name="autoFlag"
            type="checkbox"
            checked={autoFlag}
            onChange={e =>
              dispatch({
                type: "SET_OPTION",
                option: "autoFlag",
                value: e.target.checked
              })
            }
          />
        </label>
      </div>
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
      <div>
        <button onClick={() => dispatch({ type: "LOAD_BOARD", ...save1 })}>
          Load Save
        </button>
      </div>
      <div
        onMouseEnter={() =>
          dispatch({ type: "SET_OPTION", option: "showCoords", value: true })
        }
        onMouseLeave={() =>
          dispatch({ type: "SET_OPTION", option: "showCoords", value: false })
        }
      >
        Show Coords
      </div>
    </div>
  );
};

export default Component;
