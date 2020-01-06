import { Dispatch, Action } from "redux";
import { useDispatch as reduxUseDispatch } from "react-redux";

export type ExtractType<A extends Action<string>> = A extends Action<infer TYPE>
  ? TYPE
  : never;

export function useDispatch<Actions extends Action>(): Dispatch<Actions> {
  return reduxUseDispatch<Dispatch<Actions>>();
}
