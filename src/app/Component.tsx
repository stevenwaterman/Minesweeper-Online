import React, { useState } from "react";
import { Provider } from "react-redux";
import Modal from "react-modal";

import "./Styles.scss";
import Overlay, {
  targetColor,
  firstColor,
  secondColor
} from "../hover/ConstraintOverlay";
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
  const [modalIsOpen, setModalVisible] = useState(true);

  return (
    <Provider store={store}>
      <Modal
        style={{
          content: {
            width: "300px",
            height: "200px"
          }
        }}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalVisible(false)}
        contentLabel="Introduction Modal"
      >
        <h2>Instructions</h2>
        <p>
          If this is your first time using the tool, make sure you read the
          "instructions" section of the Github Readme. It explains how
          everything works!
        </p>
        <a href="https://github.com/stevenwaterman/Minesweeper-Constrained/blob/master/README.md#instructions">
          Click me to go there!
        </a>
      </Modal>
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
