import { useSelector as reduxUseSelector } from "react-redux";
import { RootState } from "../app/Reducer";

type SliceSelector<SliceName extends keyof RootState> = (
  state: RootState
) => RootState[SliceName];
export function sliceSelector<Slice extends keyof RootState>(
  slice: Slice
): SliceSelector<Slice> {
  return (state: RootState) => {
    return state[slice];
  };
}

export type ArgSelector<T, ARG> = (state: RootState, arg: ARG) => T;
export type Selector<T> = ArgSelector<T, {}>;
type SelectorCreator<State> = <T, ARG>(
  selector: (state: State, arg: ARG) => T
) => ArgSelector<T, ARG>;
export function selectorCreator<State>(
  sliceSelector: (state: RootState) => State
): SelectorCreator<State> {
  return function<T, ARGS extends any[]>(
    selector: (state: State, ...args: ARGS) => T
  ) {
    return (state: RootState, ...args: ARGS) => {
      return selector(sliceSelector(state), ...args);
    };
  };
}

export function extendSelector<T_1, ARG_1, T_2, ARG_2>(
  oldSelector: ArgSelector<T_1, ARG_1>,
  extension: (oldOutput: NonNullable<T_1>, arg: ARG_1 & ARG_2) => T_2
): ArgSelector<T_2, ARG_1 & ARG_2> {
  const newSelector: ArgSelector<T_2 | null, ARG_1 & ARG_2> = (
    state: RootState,
    arg: ARG_1 & ARG_2
  ) => {
    const oldOut = oldSelector(state, arg);
    if (oldOut == null) return null;
    return extension(oldOut as NonNullable<T_1>, arg);
  };
  return newSelector as any;
}

export function useArgSelector<T, ARG>(
  selector: ArgSelector<T, ARG>,
  arg: ARG
): T {
  return reduxUseSelector((state: RootState) => selector(state, arg));
}
export function useSelector<T>(selector: ArgSelector<T, {}>): T {
  return reduxUseSelector((state: RootState) => selector(state, {}));
}
