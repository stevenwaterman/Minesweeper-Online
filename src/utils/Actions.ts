import { Dispatch, Action } from "redux";

export type ActionType<A extends Action<string>> = A extends Action<infer TYPE> ? TYPE : never;

export function fire<A extends Action>(dispatch: Dispatch<A>, type: ActionType<A>, payload: Omit<A, "type">): () => void{
    return () => dispatch({
        type,
        ...payload
    } as A);
}
