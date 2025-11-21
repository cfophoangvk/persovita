import type { ChoiceItem } from "./ChoiceItem";

export interface ChoiceCheckboxProps {
  title: string;
  header: string;
  image?: string;
  items: ChoiceItem[];
  onSelect: () => void;
  selectedItems: number[];
  setSelectedItems: (item: number[]) => void;
  whyAskText?: string,
  handleShowWhyAskDialog?: (text: string) => void;
}