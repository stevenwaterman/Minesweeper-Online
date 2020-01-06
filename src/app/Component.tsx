import React from "react";
import { Provider } from "react-redux";

import Overlay from "../hover/Overlay";
import Board from "../board/Board";
import SelectedConstraints from "../constraints/SelectedConstraints";
import { store } from "./Store";
import { selectFirst, selectSecond, selectHover } from "../constraints/Reducer";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Overlay selectConstraint={selectHover} color="#00ff0050" />
      <Overlay selectConstraint={selectFirst} color="#ff000050" />
      <Overlay selectConstraint={selectSecond} color="#0000ff50" />
      <Board />
      <SelectedConstraints />
    </Provider>
  );
};

export default App;
