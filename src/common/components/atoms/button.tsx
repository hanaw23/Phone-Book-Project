import styled from "@emotion/styled";

import { type ButtonComponentProps } from "@/interface/atoms/button.interface";

// VARIABLES
const ButtonComponent = (props: ButtonComponentProps) => {
  // === Styles ===
  const Button = styled.button`
    background-color: ${props.backgroundColor};
    font-size: ${props.fontSize};
    border-radius: ${props.borderRadius ?? "0"};
    border: ${props.border ?? "none"};
    color: ${props.color};
    cursor: pointer;
    font-weight: ${props.fontWeight};
    padding: ${props.padding ?? "3px"};
    width: ${props.width};
  `;

  // === HTML ===
  return (
    <>
      <Button onClick={props.onClick} type={props.type}>
        {props.label}
      </Button>
    </>
  );
};

export default ButtonComponent;
