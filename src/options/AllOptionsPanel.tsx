import React from "react";
import OptionsPanel from "./OptionsPanel";
import LoadPanel from "./LoadPanel";
import GeneratePanel from "./GeneratePanel";
import { useDispatch } from "../utils/Actions";
import { SetOptionAction, selectShowOptions } from "./Reducer";
import { useSelector } from "../utils/Selector";

const Component: React.FC = () => {
  const dispatch = useDispatch<SetOptionAction>();
  const show = useSelector(selectShowOptions);
  return (
    <div
      className="optionsWrapper"
      onMouseEnter={() =>
        dispatch({ type: "SET_OPTION", option: "showOptions", value: true })
      }
      onMouseLeave={() =>
        dispatch({ type: "SET_OPTION", option: "showOptions", value: false })
      }
    >
      <div hidden={!show} className="allOptions">
        <OptionsPanel />
        <LoadPanel />
        <GeneratePanel />
      </div>
    </div>
  );
};

export default Component;
