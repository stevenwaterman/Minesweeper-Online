import { ReducerBuilder } from "../utils/Reducer";
import { Cell, Coordinate, neighbours } from "../utils/Cells";
import { Constraint } from "../utils/Constraint";
import { Action } from "@reduxjs/toolkit";
import { sliceSelector, selectorCreator, extendSelector } from "../utils/Selector";

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
export type ClearCellAction = Action<"CLEAR_CELL"> & { coordinate: Coordinate };
export type FlagCellAction = Action<"FLAG_CELL"> & { coordinate: Coordinate };

// Selectors
export const selectSlice = sliceSelector("board");
export const select = selectorCreator(selectSlice);

export const selectCells = select(s => s.cells);

export const selectWidth = extendSelector(selectCells, cells => cells.length);
export const selectHeight = extendSelector(selectCells, cells => cells[0].length);

function getCell(state: State, ...[x,y] : Coordinate): Cell | null {
  const row = state.cells[y];
  if (row == null) return null;
  const cell = row[x];
  if (cell == null) return null;
  return cell;
}
export const selectCell = select(getCell);
export const selectCellState = extendSelector(selectCell, cell => cell.cellState);
export const selectCellStateKnown = extendSelector(
  selectCell,
  cell => cell.cellStateKnown
);

function getNeighbours(state: State, ...[x, y]: Coordinate): Array<Cell> {
  const neighbourCoords = neighbours(x, y);
  const neighbourCells = neighbourCoords
    .map(([x, y]) => getCell(state, x, y))
    .filter(c => c != null);
  return neighbourCells as Array<Cell>;
}
export const selectNeighbours = select(getNeighbours);
export const selectUnknownNeighbours = extendSelector(selectNeighbours, cells =>
  cells.filter(cell => !cell.cellStateKnown)
);

function getConstraint(state: State, ...[x, y]: Coordinate): Constraint | null {
  const cell = getCell(state, x, y);
  if (cell == null) return null;
  if (!cell.cellStateKnown) return null;
  if (cell.cellState === "X") return null;

  const neighbours = getNeighbours(state, x, y);
  const unknownNeighbours = neighbours.filter(cell => !cell.cellStateKnown).map(cell => cell.coordinate);
  const mineNeighbours = neighbours.filter(
    cell => cell.cellStateKnown && cell.cellState === "X"
  );

  const number = cell.cellState;
  const hiddenMines = number - mineNeighbours.length;
  return {
    cells: unknownNeighbours,
    minMines: hiddenMines,
    maxMines: hiddenMines
  };
}
export const selectConstraint = select(getConstraint);
