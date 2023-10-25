import { css } from "@emotion/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { type InputComponentProps } from "../../lib/interface/atoms/input";

// VARIABLES
const InputComponent = (props: InputComponentProps) => {
  // === HTML ===
  return (
    <>
      <div
        className={css`
          ${props.componentClassName}
        `}
      >
        <div
          className={css`
            font-size: 0.8rem;
            margin-left: 2px;
            margin-bottom: 2px;
            width: 100%;
            background-color: transparent;
            font-weight: bold;
          `}
        >
          {props.label}{" "}
          {props.required && (
            <span
              className={css`
                background-color: transparent;
              `}
            >
              *
            </span>
          )}
        </div>
        <input
          className={css`
            width: 100%;
            border: 1px solid #bfbfbf;
            padding: 0.5rem;
            border-radius: 5px;
            color: white;
            outline: none;
            border: none;
          `}
          placeholder={props.placeholder}
          autoComplete="off"
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    </>
  );
};

export default InputComponent;
