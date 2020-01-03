import { ReducerBuilder } from "../utils/Reducer";
import { RootState } from "../app/Reducer";
import { Cell, Coordinate, CellState } from "../utils/Cells";

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
export class ClearCellAction {
  readonly type = "CLEAR_CELL";
  readonly coordinate: Coordinate;
  constructor(coordinate: Coordinate) {
    this.coordinate = coordinate;
  }
}

export class FlagCellAction {
  readonly type = "FLAG_CELL";
  readonly coordinate: Coordinate;
  constructor(coordinate: Coordinate) {
    this.coordinate = coordinate;
  }
}

// Selectors
function selectState(state: RootState): State {
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
function selectCell(state: RootState, [x, y]: Coordinate): Cell {
  return selectCells(state)[x][y];
}
export function selectCellState(
  state: RootState,
  coordinate: Coordinate
): CellState {
  return selectCell(state, coordinate).cellState;
}
export function selectCellStateKnown(
  state: RootState,
  coordinate: Coordinate
): boolean {
  return selectCell(state, coordinate).cellStateKnown;
}
