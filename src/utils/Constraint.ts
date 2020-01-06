import { Coordinate } from "./Cells";

export type Constraint = {
  coords: Coordinate[];
  minMines: number;
  maxMines: number;
};

export function canClearConstraint(constraint: Constraint): boolean {
  return constraint.maxMines <= 0;
}

export function canFlagConstraint(constraint: Constraint): boolean {
  return constraint.minMines >= constraint.coords.length;
}

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

function removeCoord(
  coords: Coordinate[],
  ...[x1, y1]: Coordinate
): Coordinate[] {
  return coords.filter(([x2, y2]) => x1 !== x2 || y1 !== y2);
}

export function cellCleared(
  constraint: Constraint,
  ...[x, y]: Coordinate
): Constraint | null {
  if (!constraintContains(constraint, x, y)) return constraint;
  if (constraint.coords.length === 1) return null;

  const newCoords = removeCoord(constraint.coords, x, y);
  const newMin = Math.min(newCoords.length, constraint.minMines);
  const newMax = Math.min(newCoords.length, constraint.maxMines);
  return {
    coords: newCoords,
    minMines: newMin,
    maxMines: newMax
  };
}

export function cellFlagged(
  constraint: Constraint,
  ...[x, y]: Coordinate
): Constraint | null {
  if (!constraintContains(constraint, x, y)) return constraint;
  if (constraint.coords.length === 1) return null;

  const newCoords = removeCoord(constraint.coords, x, y);
  const newMin = Math.max(0, constraint.minMines - 1);
  const newMax = Math.max(0, constraint.maxMines - 1);
  return {
    coords: newCoords,
    minMines: newMin,
    maxMines: newMax
  };
}

export function cellRemoved(
  constraint: Constraint,
  ...[x, y]: Coordinate
): Constraint | null {
  if (!constraintContains(constraint, x, y)) return constraint;
  if (constraint.coords.length === 1) return null;

  const newCoords = removeCoord(constraint.coords, x, y);
  const newMin = Math.min(
    newCoords.length,
    Math.max(constraint.minMines - 1, 0)
  );
  const newMax = Math.max(newCoords.length, constraint.maxMines);
  return {
    coords: newCoords,
    minMines: newMin,
    maxMines: newMax
  };
}
