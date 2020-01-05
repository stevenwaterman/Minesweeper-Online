import React from "react";
import { Provider } from "react-redux";

import Overlay from "../hover/Overlay";
import Board from "../board/Board";
import SelectedConstraints from "../constraints/SelectedConstraints";
import { store } from "./Store";
import { selectFirst, selectSecond } from "../constraints/Reducer";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Overlay selectConstraint={selectFirst} color="red"/>
      <Overlay selectConstraint={selectSecond} color="blue"/>
      <Board />
      <SelectedConstraints />
    </Provider>
  );
};

export default App;
