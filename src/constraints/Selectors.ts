import { sliceSelector, selectorCreator } from "../utils/Selector";
import { subtractConstraints, mergeConstraints, reduceConstraint } from "../utils/Constraint";

export const selectSlice = sliceSelector("constraints");
export const selector = selectorCreator(selectSlice);
export const selectFirst = selector(s => s.first);
export const selectFirstWrapped = selector(s => s.first === null ? [] : [s.first]);
export const selectSecond = selector(s => s.second);
export const selectSecondWrapped = selector(s => s.second === null ? [] : [s.second]);
export const selectTargets = selector(s => s.targets);
export const selectAnySelected = selector(
  s => s.first !== null || s.second !== null
);
export const selectSubtract = selector(
  s => subtractConstraints(s.first, s.second)
);
export const selectMerge = selector(
  s => mergeConstraints(s.first, s.second)
);
export const selectReduce = selector(
  s => reduceConstraint(s.first)
);
export const selectComplexConstraints = selector(s => s.complexConstraints);
