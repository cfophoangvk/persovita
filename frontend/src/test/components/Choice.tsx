import Badge from "../components/Badge"
import Title from "./Title"
import type { ChoiceProps } from "../interfaces/ChoiceProps"
import ChoiceItem from "./ChoiceItem"

const Choice = (props: ChoiceProps) => {
  return (
    <div className="w-full flex flex-col items-center">
      <Badge text={props.title} image={props.image}/>
      <Title text={props.header} />
      {props.description && <div className="text-lg my-2">{props.description}</div>}

      <div className="w-full flex justify-center flex-wrap gap-4">
        {props.items.map((item, index) => (
          <ChoiceItem onClick={() => props.onSelect(item.value)} text={item.text} description={item.description} image={item.image} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Choice