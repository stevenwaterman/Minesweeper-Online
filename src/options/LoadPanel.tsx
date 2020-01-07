import { Coordinate } from "../utils/Cells";
import React from "react";
import LoadButton from "./LoadButton";
import "./Styles.scss";
import { Matrix } from "../utils/Lists";
const real = {
  mines: [
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 1, 0],
    [0, 1, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 1, 1, 0, 0]
  ] as Matrix<0 | 1>,
  start: [0, 0] as Coordinate
};

const basicTraining = {
  mines: [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0]
  ] as Matrix<0 | 1>,
  start: [0, 0] as Coordinate
};

const subtractionTraining1 = {
  mines: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 0, 0, 1]
  ] as Matrix<0 | 1>,
  start: [0, 0] as Coordinate
};

const subtractionTraining2 = {
  mines: [
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 1, 0]
  ] as Matrix<0 | 1>,
  start: [0, 0] as Coordinate
};

const overlapTraining1 = {
  mines: [
    [0, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
    [0, 1, 1, 0]
  ] as Matrix<0 | 1>,
  start: [2, 0] as Coordinate
};

const wholeBoardTraining = {
  mines: [
    [0, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 0],
    [0, 1, 1, 0]
  ] as Matrix<0 | 1>,
  start: [2, 0] as Coordinate
};

const Component: React.FC = () => {
  return (
    <div className="panel">
      <div className="header">Load:</div>
      <LoadButton name="Real" save={real} />
      <LoadButton name="Basic Training" save={basicTraining} />
      <LoadButton name="Subtraction Training 1" save={subtractionTraining1} />
      <LoadButton name="Subtraction Training 2" save={subtractionTraining2} />
      <LoadButton name="Overlap Training" save={overlapTraining1} />
      <LoadButton name="Whole Board Training" save={wholeBoardTraining} />
    </div>
  );
};

export default Component;
