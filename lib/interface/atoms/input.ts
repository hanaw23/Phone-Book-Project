export interface InputComponentProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  componentClassName?: string;
  iconPrefix?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
