export interface ButtonComponentProps {
  label?: string;
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: string;
  borderRadius?: string;
  width?: string;
  border?: string;
  padding?: string;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
}
