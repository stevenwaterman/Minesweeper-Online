import { ReducerBuilder } from "../utils/Reducer";
import {
  Cell,
  Coordinate,
  neighbours,
  CellState
} from "../utils/Cells";
import { Constraint } from "../utils/Constraint";
import { Action } from "@reduxjs/toolkit";
import {
  sliceSelector,
  selectorCreator,
  extendSelector
} from "../utils/Selector";
import { Matrix, shuffle, chunk } from "../utils/Lists";

type InternalCell = {
  stateKnown: boolean;
  isMine: boolean;
};

type State = {
  cells: Matrix<InternalCell>;
  lost: boolean;
};

const INITIAL_STATE: State = {
  cells: generateCells(10, 10, 10),
  lost: false
};

function generateCells(
  width: number,
  height: number,
  mines: number
): Matrix<InternalCell> {
  const totalSize = width * height;
  const clearCellCount = totalSize - mines;

  const clearCells: InternalCell[] = Array(clearCellCount - 2).fill({
    stateKnown: false,
    isMine: false
  });
  const knownCells: InternalCell[] = Array(2).fill({
    stateKnown: true,
    isMine: false
  });
  const mineCells: InternalCell[] = Array(mines).fill({
    stateKnown: false,
    isMine: true
  });

  const cells = shuffle([...clearCells, ...knownCells, ...mineCells]);
  return chunk(cells, width);
}

// Reducer
export const reducer = ReducerBuilder.create(INITIAL_STATE)
  .addCase("CLEAR_CELL", (state, action: ClearCellAction) => {
    const [x, y] = action.coordinate;
    const cell = state.cells[x][y];
    if (cell.isMine) {
      state.lost = true;
    } else {
      cell.stateKnown = true;
    }
  })
  .addCase("FLAG_CELL", (state, action: FlagCellAction) => {
    const [x, y] = action.coordinate;
    const cell = state.cells[x][y];
    if (cell.isMine) {
      cell.stateKnown = true;
    } else {
      state.lost = true;
    }
  })
  .build();

// Actions
export type ClearCellAction = Action<"CLEAR_CELL"> & { coordinate: Coordinate };
export type FlagCellAction = Action<"FLAG_CELL"> & { coordinate: Coordinate };

// Selectors
export const selectSlice = sliceSelector("board");
export const selector = selectorCreator(selectSlice);

export const selectCells = selector(s => s.cells);
export const selectWidth = extendSelector(selectCells, cells => cells.length);
export const selectHeight = extendSelector(
  selectCells,
  cells => cells[0].length
);

function getInternalCell(
  state: State,
  { coordinate: [x, y] }: { coordinate: Coordinate }
): InternalCell | null {
  const row = state.cells[y];
  if (row == null) return null;
  const cell = row[x];
  if (cell == null) return null;
  return cell;
}
function getCell(state: State, arg: { coordinate: Coordinate }): Cell | null {
  const internalCell = getInternalCell(state, arg);
  if (internalCell == null) return null;
  const stateKnown = internalCell.stateKnown;
  const cellState = internalCell.isMine
    ? "X"
    : neighbours(...arg.coordinate)
        .map(coord => getInternalCell(state, { coordinate: coord }))
        .filter(cell => cell !== null && cell.isMine).length;
  return {
    coordinate: arg.coordinate,
    cellState: cellState as CellState,
    cellStateKnown: stateKnown
  };
}
export const selectCell = selector(getCell);
export const selectCellState = extendSelector(
  selectCell,
  cell => cell.cellState
);
export const selectCellStateKnown = extendSelector(
  selectCell,
  cell => cell.cellStateKnown
);

function getNeighbours(
  state: State,
  { coordinate: [x, y] }: { coordinate: Coordinate }
): Array<Cell> {
  const neighbourCoords = neighbours(x, y);
  const neighbourCells = neighbourCoords
    .map(([x, y]) => getCell(state, { coordinate: [x, y] }))
    .filter(c => c != null);
  return neighbourCells as Array<Cell>;
}
export const selectNeighbours = selector(getNeighbours);
export const selectUnknownNeighbours = extendSelector(selectNeighbours, cells =>
  cells.filter(cell => !cell.cellStateKnown)
);

function getConstraint(
  state: State,
  { coordinate: [x, y] }: { coordinate: Coordinate }
): Constraint | null {
  const cell = getCell(state, { coordinate: [x, y] });
  if (cell == null) return null;
  if (!cell.cellStateKnown) return null;
  if (cell.cellState === "X") return null;

  const neighbours = getNeighbours(state, { coordinate: [x, y] });
  const unknownNeighbours = neighbours
    .filter(cell => !cell.cellStateKnown)
    .map(cell => cell.coordinate);
  const mineNeighbours = neighbours.filter(
    cell => cell.cellStateKnown && cell.cellState === "X"
  );

  const number = cell.cellState;
  const hiddenMines = number - mineNeighbours.length;
  return {
    coords: unknownNeighbours,
    minMines: hiddenMines,
    maxMines: hiddenMines
  };
}
export const selectConstraint = selector(getConstraint);
