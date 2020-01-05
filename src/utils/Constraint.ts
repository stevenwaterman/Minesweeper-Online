import { Coordinate } from "./Cells";

export type Constraint = {
  cells: Coordinate[];
  minMines: number;
  maxMines: number;
};

export function constraintContains(constraint: Constraint, ...[x1,y1]: Coordinate): boolean {
    return constraint.cells.some(([x2,y2]) => x1 === x2 && y1 === y2);
}
