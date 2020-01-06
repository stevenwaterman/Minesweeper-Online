import { Coordinate } from "./Cells";

export type Constraint = {
  coords: Coordinate[];
  minMines: number;
  maxMines: number;
};

export function constraintContains(
  constraint: Constraint,
  ...[x1, y1]: Coordinate
): boolean {
  return constraint.coords.some(([x2, y2]) => x1 === x2 && y1 === y2);
}

export function constraintEquals(
  c1: Constraint | null,
  c2: Constraint | null
): boolean {
  if (c1 === null && c2 === null) return true;
  if (c1 === null || c2 === null) return false;

  const coords1 = c1.coords;
  const coords2 = c2.coords;
  return (
    coords1.every(coord => constraintContains(c2, ...coord)) &&
    coords2.every(coord => constraintContains(c1, ...coord))
  );
}
