import type { ChoiceItemProps } from "../interfaces/ChoiceItemProps"

const ChoiceItem = (props: ChoiceItemProps) => {
  if (props.description || props.image) {
    return (
      <button className="flex text-lg px-3 py-6 items-center gap-3 w-[300px] border border-gray-300 rounded-md" onClick={props.onClick}>
        {props.image && <img src={props.image} width={20} />}
        <div className="grow text-left">
          <h3>{props.text}</h3>
          {props.description && <p>{props.description}</p>}
        </div>
      </button>
    )
  } else return (
    <button className="flex text-lg justify-center px-3 py-6 w-[300px] items-center border border-gray-300 rounded-md" onClick={props.onClick}>
      {props.text}
    </button>
  )
}

export default ChoiceItem