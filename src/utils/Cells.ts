export type ClearedState = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type MineState = "X";
export type CellState = ClearedState | MineState;
export type Coordinate = [number, number];
export type Cell = {
  coordinate: Coordinate;
  cellState: CellState;
  cellStateKnown: boolean;
};
