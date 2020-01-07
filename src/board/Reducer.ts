import { ReducerBuilder } from "../utils/Reducer";
import { Cell, Coordinate, neighbours, CellState } from "../utils/Cells";
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
  cells: generateCells(14, 7, 25),
  lost: false
};

function generateCells(
  width: number,
  height: number,
  mines: number
): Matrix<InternalCell> {
  const totalSize = width * height;
  const clearCellCount = totalSize - mines;
  mines = Math.min(totalSize - 1, mines);

  const clearCells: InternalCell[] = Array(clearCellCount - 1).fill({
    stateKnown: false,
    isMine: false
  });
  const knownCells: InternalCell[] = Array(1).fill({
    stateKnown: true,
    isMine: false
  });
  const mineCells: InternalCell[] = Array(mines).fill({
    stateKnown: false,
    isMine: true
  });

  const cells = shuffle([...clearCells, ...knownCells, ...mineCells]);
  return chunk(cells, height);
}

function loadCells(
  mines: Matrix<0 | 1>,
  known: Coordinate
): Matrix<InternalCell> {
  const height = mines[0].length;

  const cells: InternalCell[] = [];
  for (let x = 0; x < mines.length; x++) {
    for (let y = 0; y < height; y++) {
      const cell: InternalCell = {
        stateKnown: x === known[0] && y === known[1],
        isMine: mines[x][y] === 1
      };
      cells.push(cell);
    }
  }

  return chunk(cells, height);
}

// Reducer
export const reducer = ReducerBuilder.create(INITIAL_STATE)
  .addCase("CLEAR_CELL", (state, action: ClearCellAction) => {
    const cell = getInternalCell(state, action);
    if (cell === null) return state;

    if (cell.isMine) {
      state.lost = true;
    } else {
      cell.stateKnown = true;
    }
  })
  .addCase("FLAG_CELL", (state, action: FlagCellAction) => {
    const cell = getInternalCell(state, action);
    if (cell === null) return state;

    if (cell.isMine) {
      cell.stateKnown = true;
    } else {
      state.lost = true;
    }
  })
  .addCase(
    "REGENERATE_BOARD",
    (state, { width, height, mines }: RegenerateBoardAction) => {
      state.cells = generateCells(width, height, mines);
    }
  )
  .addCase("LOAD_BOARD", (state, { mines, start }: LoadBoardAction) => {
    state.cells = loadCells(mines, start);
  })
  .build();

// Actions
export type ClearCellAction = Action<"CLEAR_CELL"> & { coordinate: Coordinate };
export type FlagCellAction = Action<"FLAG_CELL"> & { coordinate: Coordinate };
export type RegenerateBoardAction = Action<"REGENERATE_BOARD"> & {
  width: number;
  height: number;
  mines: number;
};
export type LoadBoardAction = Action<"LOAD_BOARD"> & {
  mines: Matrix<0 | 1>;
  start: Coordinate;
};

// Selectors
export const selectSlice = sliceSelector("board");
export const selector = selectorCreator(selectSlice);

export const selectCells = selector(s => s.cells);
export const selectWidth = extendSelector(selectCells, cells => cells.length);
export const selectHeight = extendSelector(
  selectCells,
  cells => cells[0].length
);

export const selectMineCount = extendSelector(
  selectCells,
  cells => cells.flatMap(row => row).filter(cell => cell.isMine).length
);
export const selectRemainingMineCount = extendSelector(
  selectCells,
  cells =>
    cells.flatMap(row => row).filter(cell => cell.isMine && !cell.stateKnown)
      .length
);

function getInternalCell(
  state: State,
  { coordinate: [x, y] }: { coordinate: Coordinate }
): InternalCell | null {
  const column = state.cells[x];
  if (column == null) return null;
  const cell = column[y];
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
  { coordinate }: { coordinate: Coordinate }
): Array<Cell> {
  const neighbourCoords = neighbours(...coordinate);
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
  if (unknownNeighbours.length === 0) return null;

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

export const selectUnknownCells = extendSelector(
  selectCells,
  cells =>
    cells.flatMap((column, x) =>
      column
        .map((cell, y) => [x, y, cell.stateKnown])
        .filter(([_x, _y, known]) => !known)
        .map(([x, y, _]) => [x, y])
    ) as Coordinate[]
);

export const selectCoords = selector(s => {
  const coords: Coordinate[] = [];
  for (let y = 0; y < s.cells[0].length; y++) {
    for (let x = 0; x < s.cells.length; x++) {
      coords.push([x, y]);
    }
  }
  return coords;
});
