import React from 'react';
import {Provider} from "react-redux";
import './App.css';

import Board from "../board/Board";
import {store} from "./AppReducer";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Board />
    </Provider>
  );
}

export default App;
