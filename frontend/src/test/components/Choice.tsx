import Badge from "../components/Badge"
import Title from "./Title"
import type { ChoiceProps } from "../interfaces/ChoiceProps"
import ChoiceItem from "./ChoiceItem"
import { Info } from "lucide-react"

const Choice = (props: ChoiceProps) => {
  return (
    <div className="w-full flex flex-col items-center max-w-[90vw]">
      <Badge text={props.title} image={props.image}/>
      <Title text={props.header} />
      {props.description && <div className="text-lg my-2">{props.description}</div>}

      <div className="w-full flex justify-center flex-wrap gap-4">
        {props.items.map((item, index) => (
          <ChoiceItem onClick={() => props.onSelect(item.value)} text={item.text} description={item.description} image={item.image} key={index} />
        ))}
      </div>

      {props.whyAskText && props.handleShowWhyAskDialog && (
        <div
          className="flex items-center text-gray-400 cursor-pointer mt-2 border-b border-gray-400"
          onClick={() => props.handleShowWhyAskDialog?.(props.whyAskText!)}
        >
          <Info size={16} className="mr-2 fill-gray-400 stroke-white" /> Vì sao chúng tôi hỏi câu này?
        </div>
      )}
    </div>
  )
}

export default Choice