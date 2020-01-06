import React from "react";
import { Provider } from "react-redux";

import Overlay from "../hover/ConstraintOverlay";
import Board from "../board/Board";
import Options from "../options/Options";
import SelectedConstraints from "../constraints/SelectedConstraints";
import ConstraintList from "../constraints/ConstraintList";
import { store } from "./Store";
import { selectFirst, selectSecond, selectHover } from "../constraints/Reducer";
import { canClearConstraint, canFlagConstraint } from "../utils/Constraint";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Overlay
        selectConstraint={selectHover}
        colorSelector={constraint => {
          if (canClearConstraint(constraint)) return "#00ff0050";
          if (canFlagConstraint(constraint)) return "#ff000050";
          return "#00000050";
        }}
      />
      <Overlay
        selectConstraint={selectFirst}
        colorSelector={() => "#ff990050"}
      />
      <Overlay
        selectConstraint={selectSecond}
        colorSelector={() => "#0000ff50"}
      />
      <Board />
      <SelectedConstraints />
      <Options />
      <ConstraintList />
    </Provider>
  );
};

export default App;
