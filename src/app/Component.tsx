import React from "react";
import { Provider } from "react-redux";

import "./Styles.scss";
import Overlay from "../hover/ConstraintOverlay";
import Board from "../board/Board";
import Options from "../options/Options";
import SelectedConstraints, { targetColorSelector, firstColorSelector, secondColorSelector } from "../constraints/components/SelectedConstraints";
import ConstraintActions from "../constraints/components/ConstraintActions"
import ConstraintList from "../constraints/components/ConstraintList";
import { store } from "./Store";
import { selectTarget, selectFirst, selectSecond } from "../constraints/Selectors";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="columns">
        <div className="leftColumn">
          <div className="board">
            <Overlay
              selectConstraint={selectTarget}
              colorSelector={targetColorSelector}
            />
            <Overlay
              selectConstraint={selectFirst}
              colorSelector={firstColorSelector}
            />
            <Overlay
              selectConstraint={selectSecond}
              colorSelector={secondColorSelector}
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
