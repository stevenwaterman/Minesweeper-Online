import { Coordinate } from "../utils/Cells";
import React from "react";
import LoadButton from "./LoadButton";
import "./Styles.scss";
const real = {
  mines: [
    [false, false, false, true, false, false, false],
    [false, false, false, true, false, true, true],
    [false, false, false, false, false, false, true],
    [false, false, false, false, false, false, true],
    [false, true, false, false, true, false, false],
    [false, false, false, false, false, false, true],
    [false, true, true, true, true, false, true],
    [false, false, false, false, false, false, false],
    [false, false, false, false, true, false, true],
    [false, false, false, false, false, true, false],
    [false, false, false, false, true, true, false],
    [false, true, false, true, false, false, false],
    [false, true, false, false, false, false, true],
    [false, false, false, true, true, false, false]
  ],
  start: [0, 0] as Coordinate
};

const basicTraining = {
  mines: [
    [false, false, false, true, false, false, false],
    [false, false, false, true, false, true, true],
    [false, false, false, false, false, false, true],
    [false, false, false, false, false, false, true],
    [false, true, false, false, true, false, false],
    [false, false, false, false, false, false, true],
    [false, true, true, true, true, false, true],
    [false, false, false, false, false, false, false],
    [false, false, false, false, true, false, true],
    [false, false, false, false, false, true, false],
    [false, false, false, false, true, true, false],
    [false, true, false, true, false, false, false],
    [false, true, false, false, false, false, true],
    [false, false, false, true, true, false, false]
  ],
  start: [0, 0] as Coordinate
};

const subtractionTraining = {
  mines: [
    [false, false, false, true, false, false, false],
    [false, false, false, true, false, true, true],
    [false, false, false, false, false, false, true],
    [false, false, false, false, false, false, true],
    [false, true, false, false, true, false, false],
    [false, false, false, false, false, false, true],
    [false, true, true, true, true, false, true],
    [false, false, false, false, false, false, false],
    [false, false, false, false, true, false, true],
    [false, false, false, false, false, true, false],
    [false, false, false, false, true, true, false],
    [false, true, false, true, false, false, false],
    [false, true, false, false, false, false, true],
    [false, false, false, true, true, false, false]
  ],
  start: [0, 0] as Coordinate
};

const overlapTraining = {
  mines: [
    [false, false, false, true, false, false, false],
    [false, false, false, true, false, true, true],
    [false, false, false, false, false, false, true],
    [false, false, false, false, false, false, true],
    [false, true, false, false, true, false, false],
    [false, false, false, false, false, false, true],
    [false, true, true, true, true, false, true],
    [false, false, false, false, false, false, false],
    [false, false, false, false, true, false, true],
    [false, false, false, false, false, true, false],
    [false, false, false, false, true, true, false],
    [false, true, false, true, false, false, false],
    [false, true, false, false, false, false, true],
    [false, false, false, true, true, false, false]
  ],
  start: [0, 0] as Coordinate
};

const wholeBoardTraining = {
  mines: [
    [false, false, false, true, false, false, false],
    [false, false, false, true, false, true, true],
    [false, false, false, false, false, false, true],
    [false, false, false, false, false, false, true],
    [false, true, false, false, true, false, false],
    [false, false, false, false, false, false, true],
    [false, true, true, true, true, false, true],
    [false, false, false, false, false, false, false],
    [false, false, false, false, true, false, true],
    [false, false, false, false, false, true, false],
    [false, false, false, false, true, true, false],
    [false, true, false, true, false, false, false],
    [false, true, false, false, false, false, true],
    [false, false, false, true, true, false, false]
  ],
  start: [0, 0] as Coordinate
};

const Component: React.FC = () => {
  return (
    <div className="panel">
      <div className="header">Load:</div>
      <LoadButton name="Real" save={real} />
      <LoadButton name="Basic Training" save={basicTraining} />
      <LoadButton name="Subtraction Training" save={subtractionTraining} />
      <LoadButton name="Overlap Training" save={overlapTraining} />
      <LoadButton name="Whole Board Training" save={wholeBoardTraining} />
    </div>
  );
};

export default Component;
