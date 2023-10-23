export interface InputComponentProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  componentClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
