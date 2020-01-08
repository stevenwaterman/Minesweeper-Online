import React from "react";
import { Provider } from "react-redux";

import "./Styles.scss";
import Overlay, { targetColor, firstColor, secondColor } from "../hover/ConstraintOverlay";
import Board from "../board/Board";
import CoordsOverlay from "../coordsOverlay/CoordsOverlay";
import AllOptions from "../options/AllOptionsPanel";
import Title from "./Title";
import SelectedConstraints from "../constraints/components/SelectedConstraints";
import ConstraintActions from "../constraints/components/ConstraintActions";
import ConstraintList from "../constraints/components/ConstraintList";
import { store } from "./Store";
import {
  selectTargets,
  selectFirstWrapped,
  selectSecondWrapped
} from "../constraints/Selectors";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="columns">
        <div className="leftColumn">
          <Title />
          <div className="board">
            <CoordsOverlay />
            <Overlay
              selectConstraints={selectTargets}
              colorSelector={targetColor}
            />
            <Overlay
              selectConstraints={selectFirstWrapped}
              colorSelector={firstColor}
            />
            <Overlay
              selectConstraints={selectSecondWrapped}
              colorSelector={secondColor}
            />
            <Board />
          </div>
          <SelectedConstraints />
          <ConstraintActions />
          <ConstraintList />
        </div>
        <div className="rightColumn">
          <AllOptions />
        </div>
      </div>
    </Provider>
  );
};

export default App;
