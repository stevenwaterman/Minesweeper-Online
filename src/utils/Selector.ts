import { useSelector as reduxUseSelector } from "react-redux";
import { RootState } from "../app/Reducer";

type SliceSelector<SliceName extends keyof RootState> = (state: RootState) => RootState[SliceName];
export function sliceSelector<Slice extends keyof RootState>(
  slice: Slice
): SliceSelector<Slice> {
  return (state: RootState) => {
    return state[slice];
  };
}

type Selector<T, ARGS extends any[]> = (state: RootState, ...args: ARGS) => T;
type SelectorCreator<State> = <T, ARGS extends any[]>(selector: (state: State, ...args: ARGS) => T) => Selector<T, ARGS>;
export function selectorCreator<State>(
  sliceSelector: (state: RootState) => State
): SelectorCreator<State> {
  return function<T, ARGS extends any[]>(selector: (state: State, ...args: ARGS) => T) {
    return (state: RootState, ...args: ARGS) => {
      return selector(sliceSelector(state), ...args);
    };
  };
}

export function extendSelector<OLD_OUT, OLD_ARGS extends any[], NEW_OUT, NEW_ARGS extends any[]>(
  oldSelector: Selector<OLD_OUT, OLD_ARGS>,
  extension: (oldOutput: NonNullable<OLD_OUT>, oldArgs: OLD_ARGS, ...args: NEW_ARGS) => NEW_OUT
): OLD_OUT extends null ? Selector<NEW_OUT | null, [OLD_ARGS, NEW_ARGS]> : Selector<NEW_OUT, [OLD_ARGS, NEW_ARGS]>{
  const newSelector: Selector<NEW_OUT | null, [OLD_ARGS, NEW_ARGS]> = (state: RootState, oldArgs: OLD_ARGS, newArgs: NEW_ARGS) => {
    const oldOut = oldSelector(state, ...oldArgs);
    if(oldOut == null) return null;
    return extension(oldOut as NonNullable<OLD_OUT>, oldArgs, ...newArgs);
  }
  return newSelector as any;
}

export function useSelector<T, ARGS extends any[]>(
  selector: Selector<T, ARGS>,
  ...args: ARGS
): T {
  return reduxUseSelector((state: RootState) => selector(state, ...args));
}
