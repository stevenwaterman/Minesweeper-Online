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

export function subtractConstraints(
  c1: Constraint | null,
  c2: Constraint | null
): Constraint | null {
  if (c1 === null || c2 === null) return null;

  const [big, small] =
    c1.coords.length > c2.coords.length ? [c1, c2] : [c2, c1];
  if (big.coords.length <= small.coords.length) return null;
  if (small.coords.some(coord => !constraintContains(big, ...coord))) {
    return null;
  }

  const newCoords = big.coords.filter(
    ([x, y]) => !constraintContains(small, x, y)
  );
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

export function overlapConstraints(
  c1: Constraint | null,
  c2: Constraint | null
): Constraint | null {
  if (c1 === null || c2 === null) return null;

  const overlap = getOverlap(c1, c2);
  if (overlap.length === 0) return null;

  const c1RemainingCells = c1.coords.length - overlap.length;
  const c2RemainingCells = c2.coords.length - overlap.length;
  if (c1RemainingCells === 0) return null;
  if (c2RemainingCells === 0) return null;

  const c1MinInOverlap = c1.minMines - c1RemainingCells;
  const c2MinInOverlap = c2.minMines - c2RemainingCells;
  const minInOverlap = Math.max(c1MinInOverlap, c2MinInOverlap);

  const c1MaxInOverlap = c1.maxMines;
  const c2MaxInOverlap = c2.maxMines;
  const maxInOverlap = Math.max(c1MaxInOverlap, c2MaxInOverlap);

  const clamped = {
    coords: overlap,
    minMines: Math.min(Math.max(minInOverlap, 0), overlap.length),
    maxMines: Math.min(Math.max(maxInOverlap, 0), overlap.length)
  };

  if (clamped.minMines === 0 && clamped.maxMines === clamped.coords.length)
    return null;
  else return clamped;
}

export function getOverlap(c1: Constraint, c2: Constraint): Coordinate[] {
  return c1.coords.filter(([x, y]) => constraintContains(c2, x, y));
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
