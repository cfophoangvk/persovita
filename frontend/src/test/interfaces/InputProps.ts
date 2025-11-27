export interface InputProps {
  title: string;
  description: string;
  value: string;
  setValue: (name: string) => void;
  handleInput: () => void;
  isNumber?: boolean;
  hasError: boolean;
  errorMsg: string;
  whyAskText?: string;
  handleShowWhyAskDialog?: (text: string) => void;
}
