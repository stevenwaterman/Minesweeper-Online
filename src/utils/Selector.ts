import {
  useSelector as reduxUseSelector,
} from "react-redux";
import { RootState } from "../app/Reducer";

export function useSelector<T, REST extends any[]>(func: (state: RootState, ...rest: REST) => T, ...rest: REST): T {
    return reduxUseSelector((state: RootState) => func(state, ...rest))
}