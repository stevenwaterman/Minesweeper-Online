import React from "react";
import { Selector, useSelector } from "../utils/Selector";
import { useDispatch } from "../utils/Actions";
import { SetOptionAction, State } from "./Reducer";
import "./Styles.scss";
type Props = {
  selector: Selector<boolean>;
  text: string;
  option: keyof State;
};

const Component: React.FC<Props> = ({ selector, text, option }) => {
  const enabled = useSelector(selector);
  const dispatch = useDispatch<SetOptionAction>();

  return (
    <div>
      <label>
        {text}:
        <input
          name="showRemaining"
          type="checkbox"
          checked={enabled}
          onChange={e =>
            dispatch({
              type: "SET_OPTION",
              option,
              value: e.target.checked
            })
          }
        />
      </label>
    </div>
  );
};

export default Component;
