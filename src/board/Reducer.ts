import { ReducerBuilder } from "../utils/Reducer";
import { RootState } from "../app/Reducer";
import { Cell, Coordinate, CellState } from "../utils/Cells";
import { actionCreator } from "../utils/ActionCreator";

interface Matrix<T> extends Array<Array<T>> {}

type State = {
  cells: Matrix<Cell>;
  lost: boolean;
};

const INITIAL_STATE: State = {
  cells: generateCells(10, 10),
  lost: false
};

function generateCells(width: number, height: number): Matrix<Cell> {
  const cells: Matrix<Cell> = [];
  for (let x = 0; x < width; x++) {
    const row: Cell[] = [];
    cells.push(row);
    for (let y = 0; y < height; y++) {
      row.push({
        coordinate: [x, y],
        cellStateKnown: false,
        cellState: 1
      });
    }
  }
  return cells;
}

// Reducer
export const reducer = ReducerBuilder.create(INITIAL_STATE)
  .addCase("CLEAR_CELL", (state, action: ClearCellAction) => {
    const [x, y] = action.coordinate;
    const cell = state.cells[x][y];
    if (cell.cellState === "X") {
      state.lost = true;
    } else {
      cell.cellStateKnown = true;
    }
  })
  .addCase("FLAG_CELL", (state, action: FlagCellAction) => {
    const [x, y] = action.coordinate;
    const cell = state.cells[x][y];
    if (cell.cellState === "X") {
      cell.cellStateKnown = true;
    } else {
      state.lost = true;
    }
  })
  .build();

// Actions
export type ClearCellAction = {
  type: "CLEAR_CELL";
  coordinate: Coordinate;
};
export const createClearCellAction = actionCreator<ClearCellAction>(
  "CLEAR_CELL"
);

export type FlagCellAction = {
  type: "FLAG_CELL";
  coordinate: Coordinate;
};
export const createFlagCellAction = actionCreator<FlagCellAction>("FLAG_CELL");

// Selectors
export function selectState(state: RootState): State {
  return state.board;
}
export function selectWidth(state: RootState): number {
  return selectCells(state).length;
}
export function selectHeight(state: RootState): number {
  return selectCells(state)[0].length;
}
export function selectCells(state: RootState): Matrix<Cell> {
  return selectState(state).cells;
}
export function selectCell(state: RootState, [x, y]: Coordinate): Cell | null {
  const row = selectCells(state)[x];
  if (row == null) return null;
  return row[y];
}
export function selectCellState(
  state: RootState,
  coordinate: Coordinate
): CellState | null {
  const cell = selectCell(state, coordinate);
  if (cell == null) return null;
  return cell.cellState;
}
export function selectCellStateKnown(
  state: RootState,
  coordinate: Coordinate
): boolean | null {
  const cell = selectCell(state, coordinate);
  if (cell == null) return null;
  return cell.cellStateKnown;
}
