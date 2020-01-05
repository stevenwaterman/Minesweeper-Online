import { Dispatch, Action } from "redux";

export type ActionType<A extends Action<string>> = A extends Action<infer TYPE> ? TYPE : never;

export function fire<A extends Action>(dispatch: Dispatch<A>, type: ActionType<A>, params: Omit<A, "type">){
    dispatch({
        type,
        ...params
    } as A);
}
