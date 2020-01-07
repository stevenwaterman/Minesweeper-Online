import { sliceSelector, selectorCreator } from "../utils/Selector";
import { subtractConstraints, mergeConstraints, overlapConstraints } from "../utils/Constraint";

export const selectSlice = sliceSelector("constraints");
export const selector = selectorCreator(selectSlice);
export const selectFirst = selector(s => s.first);
export const selectSecond = selector(s => s.second);
export const selectTarget = selector(s => s.target);
export const selectAnySelected = selector(
  s => s.first !== null || s.second !== null
);
export const selectSubtract = selector(
  s => subtractConstraints(s.first, s.second)
);
export const selectMerge = selector(
  s => mergeConstraints(s.first, s.second)
);
export const selectOverlap = selector(
  s => overlapConstraints(s.first, s.second)
);
export const selectComplexConstraints = selector(s => s.complexConstraints);
