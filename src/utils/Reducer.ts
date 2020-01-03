import { Action, Reducer, createReducer, CaseReducers } from "@reduxjs/toolkit";

export type ReducerCase<State, TYPE extends string, A extends Action<TYPE>> = [
  TYPE,
  (state: State, action: A) => void
];

export class ReducerBuilder<State, Actions extends Action<string>> {
  readonly cases: Array<ReducerCase<State, string, Actions>>;
  readonly initialState: State;

  static create<State>(initialState: State): ReducerBuilder<State, never> {
    return new ReducerBuilder<State, never>(initialState, []);
  }

  private constructor(
    initialState: State,
    cases: Array<ReducerCase<State, string, Actions>>
  ) {
    this.initialState = initialState;
    this.cases = cases;
  }

  addCase<TYPE extends string, A extends Action<TYPE>>(
    ...[type, func]: ReducerCase<State, TYPE, A>
  ): ReducerBuilder<State, Actions | A> {
    const cases = [...this.cases, [type, func]] as Array<
      ReducerCase<State, string, Actions | A>
    >;
    return new ReducerBuilder<State, Actions | A>(this.initialState, cases);
  }

  build(): Reducer<State, Actions> {
    const cases: CaseReducers<
      State,
      Record<string, Actions>
    > = this.cases.reduce(
      (obj, [type, func]) => {
        obj[type] = (state: State, action: Actions) => {
          func(state, action);
          return state;
        };
        return obj;
    },
      {} as any
    );
    return createReducer(this.initialState, cases);
  }
}
