export interface InputComponentProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  componentClassName?: string;
  iconPrefix?: boolean;
  colorLabel?: string;
  border?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
