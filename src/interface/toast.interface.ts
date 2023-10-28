export enum SeverityToast {
  SUCCESS = "success",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

export interface ToastProps {
  isOpen: boolean;
  close: () => void;
  summary?: string;
  detail?: string;
  severity?: SeverityToast;
}
