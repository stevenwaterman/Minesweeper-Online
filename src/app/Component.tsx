import React from "react";
import { Provider } from "react-redux";

import "./Styles.scss";
import Overlay from "../hover/ConstraintOverlay";
import Board from "../board/Board";
import Options from "../options/Options";
import SelectedConstraints from "../constraints/SelectedConstraints";
import ConstraintActions from "../constraints/ConstraintActions"
import ConstraintList from "../constraints/ConstraintList";
import { store } from "./Store";
import { selectFirst, selectSecond, selectHover } from "../constraints/Reducer";
import { canClearConstraint, canFlagConstraint } from "../utils/Constraint";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="columns">
        <div className="leftColumn">
          <div className="board">
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
          </div>
          <SelectedConstraints />
          <ConstraintActions />
          <ConstraintList />
        </div>
        <div className="rightColumns">
          <Options />
        </div>
      </div>
    </Provider>
  );
};

export default App;
