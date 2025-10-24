import type { ChoiceCheckboxProps } from "../interfaces/ChoiceCheckboxProps"
import Badge from "./Badge"
import Button from "./Button"
import ChoiceCheckboxItem from "./ChoiceCheckboxItem"
import Title from "./Title"

const ChoiceCheckbox = (props: ChoiceCheckboxProps) => {

  const handleChoiceClick = (choice: number) => {
    if (choice === 0) {
      props.setSelectedItems([0]);
    } else {
      const newSelected = props.selectedItems.filter((item) => item !== 0);
      if (newSelected.includes(choice)) {
        props.setSelectedItems(newSelected.filter((item) => item !== choice));
      } else {
        props.setSelectedItems([...newSelected, choice]);
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center max-w-[90vw]">
      <Badge text={props.title} image={props.image} />
      <Title text={props.header} />

      <div className="w-full flex justify-center flex-wrap gap-4">
        {props.items.map((item, index) => (
          <ChoiceCheckboxItem onClick={() => handleChoiceClick(item.value)} checked={props.selectedItems.find(si => si === item.value) !== undefined} text={item.text} description={item.description} image={item.image} key={index} />
        ))}
      </div>

      <Button disabled={props.selectedItems.length === 0} text="Tiếp tục" onClick={props.onSelect} />
    </div>
  )
}

export default ChoiceCheckbox