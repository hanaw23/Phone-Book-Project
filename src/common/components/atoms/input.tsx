import { css } from "@emotion/css";
import { type InputComponentProps } from "@/interface/atoms/input.interface";

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
            color: ${props.colorLabel};
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
            padding: 0.5rem;
            border-radius: 5px;
            color: white;
            outline: none;
            border: ${props.border};
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
