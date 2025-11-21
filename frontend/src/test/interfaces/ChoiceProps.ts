import type { ChoiceItem } from "./ChoiceItem";

export interface ChoiceProps {
  title: string;
  header: string;
  description?: string;
  image?: string;
  items: ChoiceItem[];
  onSelect: (selectedItem: number) => void;
  whyAskText?: string,
  handleShowWhyAskDialog?: (text: string) => void;
}