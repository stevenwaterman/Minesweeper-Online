import { Coordinate } from "./Cells";
import { Dispatch } from "redux";
import { ClearCellAction, FlagCellAction } from "../board/Reducer";

export type Constraint = {
  coords: Coordinate[];
  minMines: number;
  maxMines: number;
};

export function canClear(constraint: Constraint): boolean {
  return constraint.maxMines <= 0;
}

export function canFlag(constraint: Constraint): boolean {
  return constraint.minMines >= constraint.coords.length;
}

export function subtractConstraints(
  c1: Constraint | null,
  c2: Constraint | null
): Constraint | null {
  if (c1 === null || c2 === null) return null;

  const [big, small] =
    c1.coords.length > c2.coords.length ? [c1, c2] : [c2, c1];
  if (big.coords.length <= small.coords.length) return null;
  if (small.coords.some(coord => !inConstraint(big, ...coord))) {
    return null;
  }

  const newCoords = big.coords.filter(([x, y]) => !inConstraint(small, x, y));
  const minMines = big.minMines - small.maxMines;
  const maxMines = big.maxMines - small.minMines;
  const clampedMin = Math.min(Math.max(minMines, 0), newCoords.length);
  const clampedMax = Math.min(Math.max(maxMines, 0), newCoords.length);
  if (clampedMin === 0 && clampedMax === newCoords.length) return null;

  return {
    coords: newCoords,
    minMines: clampedMin,
    maxMines: clampedMax
  };
}

export function mergeConstraints(
  c1: Constraint | null,
  c2: Constraint | null
): Constraint | null {
  if (c1 === null || c2 === null) return null;
  if (!constraintEquals(c1, c2)) return null;
  if (c1.minMines <= c2.minMines && c1.maxMines >= c2.maxMines) return null;
  if (c2.minMines <= c1.minMines && c2.maxMines >= c1.maxMines) return null;

  return {
    coords: c1.coords,
    minMines: Math.max(c1.minMines, c2.minMines),
    maxMines: Math.min(c1.maxMines, c2.maxMines)
  };
}

export function reduceConstraints(c1: Constraint | null, c2: Constraint | null): Constraint[] {
  if (c1 === null || c2 !== null) return [];

  const cellCount = c1.coords.length - 1;
  const min = Math.min(Math.max(c1.minMines - 1, 0), cellCount);
  const max = Math.min(c1.maxMines, cellCount);
  if (min === 0 && max === cellCount) return [];

  const output: Constraint[] = c1.coords
    .map(([x1, y1]) => c1.coords.filter(([x2, y2]) => x1 !== x2 || y1 !== y2))
    .map(coords => ({ coords: coords, minMines: min, maxMines: max }));
  return output;
}

export function inConstraint(
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
    coords1.every(coord => inConstraint(c2, ...coord)) &&
    coords2.every(coord => inConstraint(c1, ...coord))
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
  if (!inConstraint(constraint, x, y)) return constraint;
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
  if (!inConstraint(constraint, x, y)) return constraint;
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
  if (!inConstraint(constraint, x, y)) return constraint;
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

export function clearConstraint(
  dispatch: Dispatch<ClearCellAction>,
  constraint: Constraint
) {
  constraint.coords.forEach(coordinate =>
    dispatch({ type: "CLEAR_CELL", coordinate })
  );
}

export function flagConstraint(
  dispatch: Dispatch<FlagCellAction>,
  constraint: Constraint
) {
  constraint.coords.forEach(coordinate =>
    dispatch({ type: "FLAG_CELL", coordinate })
  );
}
