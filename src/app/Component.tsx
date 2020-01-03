import React from 'react';
import {Provider} from "react-redux";

import Board from "../board/Component";
import {store} from "./Reducer";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Board />
    </Provider>
  );
}

export default App;
