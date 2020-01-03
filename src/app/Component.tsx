import React from "react";
import { Provider } from "react-redux";

import Overlay from "../hover/Overlay";
import Board from "../board/Board";
import ConstraintPair from "../constraints/ConstraintPair";
import { store } from "./Store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Overlay />
      <Board />
      <ConstraintPair />
    </Provider>
  );
};

export default App;
