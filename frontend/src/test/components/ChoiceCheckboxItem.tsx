import { Square, SquareCheck } from "lucide-react";
import type { ChoiceCheckboxItemProps } from "../interfaces/ChoiceCheckboxItemProps";

const ChoiceCheckboxItem = (props: ChoiceCheckboxItemProps) => {
  return (
    <button
      className={`flex px-3 md:py-6 py-2 items-center gap-3 w-[450px] border rounded-md transition-colors hover:border-black hover:border-2 duration-300 md:text-lg text-base ${
        props.checked ? "border-black border-2" : "border-gray-300"
      }`}
      onClick={props.onClick}
    >
      <div>{props.checked ? <SquareCheck /> : <Square />}</div>
      {props.image && <img src={props.image} width={20} />}
      <div className="grow text-left">
        <h3>{props.text}</h3>
        {props.description && <p className="text-base">{props.description}</p>}
      </div>
    </button>
  );
};

export default ChoiceCheckboxItem;
