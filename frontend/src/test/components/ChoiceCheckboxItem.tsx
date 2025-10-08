import { Square, SquareCheck } from "lucide-react"
import type { ChoiceCheckboxItemProps } from "../interfaces/ChoiceCheckboxItemProps"

const ChoiceCheckboxItem = (props: ChoiceCheckboxItemProps) => {
  return <button className={`flex text-lg px-3 py-6 items-center gap-3 w-[300px] border rounded-md transition-colors ${props.checked ? "border-gray-500" : "border-gray-300"}`} onClick={props.onClick}>
    <div>
      {props.checked ? <SquareCheck /> : <Square />}
    </div>
    {props.image && <img src={props.image} width={20} />}
    <div className="grow text-left">
      <h3>{props.text}</h3>
      {props.description && <p className="text-base">{props.description}</p>}
    </div>
  </button>
}

export default ChoiceCheckboxItem