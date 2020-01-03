import React from "react";
import { Provider } from "react-redux";

import Overlay from "../overlay/Component";
import Board from "../board/Component";
import ConstraintInfo from "../constraintInfo/Component";
import { store } from "./Store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Overlay />
      <Board />
      <ConstraintInfo />
    </Provider>
  );
};

export default App;
