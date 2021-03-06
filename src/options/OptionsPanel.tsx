import React from "react";
import {
  selectCheatMode,
  selectAutoZero,
  selectAutoClear,
  selectAutoFlag,
  selectShowRemaining,
  selectShowSubtraction,
  selectShowReduce,
  selectShowMerge,
  selectShowBoardConstraint,
  selectResolveComplex
} from "./Reducer";
import OptionCheckbox from "./OptionCheckbox";
import "./Styles.scss";
const Component: React.FC = () => {
  return (
    <div className="panel">
      <div className="header">Options:</div>
      <OptionCheckbox
        selector={selectShowRemaining}
        option="showRemaining"
        text="Show Remaining"
      />
      <OptionCheckbox
        selector={selectCheatMode}
        option="cheatMode"
        text="Cheat Mode"
      />
      <OptionCheckbox
        selector={selectAutoZero}
        option="autoZero"
        text="Auto Zero"
      />
      <OptionCheckbox
        selector={selectAutoClear}
        option="autoClear"
        text="Auto Clear"
      />
      <OptionCheckbox
        selector={selectAutoFlag}
        option="autoFlag"
        text="Auto Flag"
      />
      <OptionCheckbox
        selector={selectResolveComplex}
        option="resolveComplex"
        text="Resolve Complex"
      />
      <OptionCheckbox
        selector={selectShowSubtraction}
        option="showSubtraction"
        text="Show Subtraction"
      />
      <OptionCheckbox
        selector={selectShowReduce}
        option="showReduce"
        text="Show Reduce"
      />
      <OptionCheckbox
        selector={selectShowMerge}
        option="showMerge"
        text="Show Merge"
      />
      <OptionCheckbox
        selector={selectShowBoardConstraint}
        option="showBoardConstraint"
        text="Show Board Constraint"
      />
    </div>
  );
};

export default Component;
