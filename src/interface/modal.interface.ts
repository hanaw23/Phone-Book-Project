export interface ModalProps {
  isOpen: boolean;
  close: () => void;
  title?: string;
  content: React.ReactNode | React.ReactNode[];
  showFooter?: boolean;
  footer?: React.ReactNode | React.ReactNode[];
}
