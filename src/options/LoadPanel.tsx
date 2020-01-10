import { Coordinate } from "../utils/Cells";
import React from "react";
import LoadButton from "./LoadButton";
import "./Styles.scss";
import { Matrix } from "../utils/Lists";
import { State as OptionState } from "./Reducer";
export type Save = {
  mines: Matrix<0 | 1>;
  start: Coordinate;
  options: Partial<OptionState>;
};

const real: Save = {
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
  start: [0, 0] as Coordinate,
  options: {
    showRemaining: false,
    cheatMode: false,
    autoZero: true,
    autoClear: false,
    autoFlag: false,
    resolveComplex: true,
    showSubtraction: false,
    showReduce: false,
    showMerge: false,
    showBoardConstraint: false
  }
};

const basicTraining: Save = {
  mines: [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0]
  ] as Matrix<0 | 1>,
  start: [0, 0] as Coordinate,
  options: {
    showRemaining: false,
    cheatMode: false,
    autoZero: true,
    autoClear: false,
    autoFlag: false,
    resolveComplex: true,
    showSubtraction: false,
    showReduce: false,
    showMerge: false,
    showBoardConstraint: false
  }
};

const subtractionTraining1: Save = {
  mines: [
    [0, 0, 1],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 1]
  ] as Matrix<0 | 1>,
  start: [0, 0] as Coordinate,
  options: {
    showRemaining: false,
    cheatMode: false,
    autoZero: true,
    autoClear: false,
    autoFlag: false,
    resolveComplex: true,
    showSubtraction: true,
    showReduce: false,
    showMerge: false,
    showBoardConstraint: false
  }
};

const subtractionTraining2: Save = {
  mines: [
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 1, 0, 0]
  ] as Matrix<0 | 1>,
  start: [3, 0] as Coordinate,
  options: {
    showRemaining: false,
    cheatMode: true,
    autoZero: true,
    autoClear: false,
    autoFlag: false,
    resolveComplex: true,
    showSubtraction: true,
    showReduce: false,
    showMerge: false,
    showBoardConstraint: false
  }
};

const reduceTraining1: Save = {
  mines: [
    [0, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
    [0, 1, 0, 0]
  ] as Matrix<0 | 1>,
  start: [2, 0] as Coordinate,
  options: {
    showRemaining: false,
    cheatMode: true,
    autoZero: true,
    autoClear: false,
    autoFlag: false,
    resolveComplex: true,
    showSubtraction: true,
    showReduce: true,
    showMerge: true,
    showBoardConstraint: false
  }
};

const reduceTraining2: Save = {
  mines: [
    [0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0]
  ] as Matrix<0 | 1>,
  start: [3, 3] as Coordinate,
  options: {
    showRemaining: false,
    cheatMode: true,
    autoZero: true,
    autoClear: false,
    autoFlag: false,
    resolveComplex: true,
    showSubtraction: true,
    showReduce: true,
    showMerge: true,
    showBoardConstraint: false
  }
};

const wholeBoardTraining: Save = {
  mines: [
    [0, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 0],
    [0, 1, 1, 0]
  ] as Matrix<0 | 1>,
  start: [2, 0] as Coordinate,
  options: {
    showRemaining: false,
    cheatMode: true,
    autoZero: true,
    autoClear: false,
    autoFlag: false,
    resolveComplex: true,
    showSubtraction: true,
    showReduce: true,
    showMerge: true,
    showBoardConstraint: true
  }
};

const Component: React.FC = () => {
  return (
    <div className="panel">
      <div className="header">Load:</div>
      <LoadButton name="Real" save={real} />
      <LoadButton name="Basic Training" save={basicTraining} />
      <LoadButton name="Subtraction Training 1" save={subtractionTraining1} />
      <LoadButton name="Subtraction Training 2" save={subtractionTraining2} />
      <LoadButton name="Reduction Training 1" save={reduceTraining1} />
      <LoadButton name="Reduction Training 2" save={reduceTraining2} />
      <LoadButton name="Whole Board Training" save={wholeBoardTraining} />
    </div>
  );
};

export default Component;
