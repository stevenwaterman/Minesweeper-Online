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
      <Overlay selectConstraint={selectFirst} color="red"/>
      <Overlay selectConstraint={selectSecond} color="blue"/>
      <Overlay selectConstraint={selectHover} color="green"/>
      <Board />
      <SelectedConstraints />
    </Provider>
  );
};

export default App;
