import { ReducerBuilder } from "../utils/Reducer";

export type ClearedState = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type MineState = "X";
export type UnknownState = null;
export type Cell = {
  coordinate: Coordinate;
  state: ClearedState | MineState;
  stateKnown: boolean;
};
export type Coordinate = [number, number];

interface Matrix<T> extends Array<Array<T>> {}

type State = {
  cells: Matrix<Cell>;
  lost: boolean;
};

const INITIAL_STATE: State = {
  cells: [],
  lost: false
};

export const reducer = ReducerBuilder.create(INITIAL_STATE)
  .addCase("CLEAR_CELL", (state, action: ClearCellAction) => {
    const [x, y] = action.coordinate;
    const cell = state.cells[x][y];
    if (cell.state === "X") {
      state.lost = true;
    } else {
      cell.stateKnown = true;
    }
  })
  .addCase("FLAG_CELL", (state, action: FlagCellAction) => {
    const [x, y] = action.coordinate;
    const cell = state.cells[x][y];
    if (cell.state === "X") {
      cell.stateKnown = true;
    } else {
      state.lost = true;
    }
  })
  .build();

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