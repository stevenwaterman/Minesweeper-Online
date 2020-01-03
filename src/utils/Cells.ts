export type ClearedState = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type MineState = "X";
export type CellState = ClearedState | MineState;
export type Coordinate = Readonly<[number, number]>;
export function neighbours(coord: Coordinate): Coordinate[]{
  const [x,y] = coord;
  return [
    [x - 1, y],
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
    [x, y + 1],
    [x - 1, y + 1]
  ];
}
export type Cell = {
  coordinate: Coordinate;
  cellState: CellState;
  cellStateKnown: boolean;
};
