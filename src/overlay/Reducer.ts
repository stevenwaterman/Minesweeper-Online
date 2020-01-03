import { Coordinate, neighbours, Cell } from "../utils/Cells";
import { ReducerBuilder } from "../utils/Reducer";
import { ClearCellAction, FlagCellAction, selectCell } from "../board/Reducer";
import { RootState } from "../app/Reducer";
import { actionCreator } from "../utils/ActionCreator";

type State = {
  hovering: Coordinate | null;
};

const INITIAL_STATE: State = {
  hovering: null
};

// Reducer
export const reducer = ReducerBuilder.create(INITIAL_STATE)
  .addCase("CLEAR_CELL", (state, action: ClearCellAction) => {
    if (state.hovering === action.coordinate) {
      state.hovering = null;
    }
  })
  .addCase("FLAG_CELL", (state, action: FlagCellAction) => {
    if (state.hovering === action.coordinate) {
      state.hovering = null;
    }
  })
  .addCase("SET_HOVER", (state, action: SetHoverAction) => {
    state.hovering = action.location;
  })
  .build();

// Actions
export type SetHoverAction = {
  type: "SET_HOVER";
  location: Coordinate | null;
};
export const createSetHoverAction = actionCreator<SetHoverAction>("SET_HOVER");

// Selectors
function selectState(state: RootState): State {
  return state.overlay;
}

export function selectHovering(state: RootState): Coordinate | null {
    return selectState(state).hovering;
}
export function selectIsHighlighted(
  state: RootState,
  [x, y]: Coordinate
): boolean {
  const hoveredLocation = selectState(state).hovering;
  if (hoveredLocation == null) return false;

  const [hovX, hovY] = hoveredLocation;
  if (x >= hovX - 1 && x <= hovX + 1) {
    if (y >= hovY - 1 && y <= hovY + 1) {
      if (x !== hovX || y !== hovY) {
        return true;
      }
    }
  }
  return false;
}
export function selectHoveringCells(state: RootState): Cell[] | null{
    const hovering = selectHovering(state);
    if(hovering == null) return null;
    const coords = neighbours(hovering);
    const cells: Array<Cell | null> = coords.map(coord => selectCell(state, coord))
    const nonNull = cells.filter(cell => cell != null) as Array<Cell>;
    return nonNull;
}