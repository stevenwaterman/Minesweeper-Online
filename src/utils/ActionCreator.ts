import { Action } from "redux";
import { number, string } from "prop-types";

type ActionCreator<A extends Action> = (rest: Omit<A, "type">) => A

export type ActionType<A extends Action<string>> = A extends Action<infer TYPE> ? TYPE : never;

export function actionCreator<A extends Action>(type: ActionType<A>): ActionCreator<A>{
    return (rest: Omit<A, "type">) => ({
        type,
        ...rest
    } as A);
};
