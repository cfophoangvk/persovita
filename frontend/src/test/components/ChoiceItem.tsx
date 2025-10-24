import type { ChoiceItemProps } from "../interfaces/ChoiceItemProps";

const ChoiceItem = (props: ChoiceItemProps) => {
  if (props.description || props.image) {
    return (
      <button
        className="flex px-3 md:py-6 py-2 items-center gap-3 w-[450px] border border-gray-300 rounded-md hover:border-black hover:border-2 transition-colors duration-300 md:text-lg text-base"
        onClick={props.onClick}
      >
        {props.image && <img src={props.image} width={20} />}
        <div className="grow text-left">
          <h3>{props.text}</h3>
          {props.description && <p>{props.description}</p>}
        </div>
      </button>
    );
  } else
    return (
      <button
        className="flex justify-center px-3 md:py-6 py-2 w-[450px] items-center border border-gray-300 rounded-md hover:border-black hover:border-2 transition-colors duration-300 md:text-lg text-base"
        onClick={props.onClick}
      >
        {props.text}
      </button>
    );
};

export default ChoiceItem;
