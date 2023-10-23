import { css } from "@emotion/css";

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
          `}
        >
          {props.label} {props.required && <span>*</span>}
        </div>
        <input
          className={css`
            width: 100%;
            border: 1px solid #bfbfbf;
            padding: 0.5rem;
            border-radius: 5px;
            color: white;
            outline: none;
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
