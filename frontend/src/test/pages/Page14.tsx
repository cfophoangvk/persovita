import Badge from "../components/Badge"
import Button from "../components/Button"
import Title from "../components/Title"
import { OBJECTIVE_ITEMS } from "../constants/section"

const Page14 = (props: { title: string, header: string, description: string, objectiveIds: number[], onToggle: (id: number) => void, hasError: boolean, errorMsg: string, handleCheck: () => void }) => {

  return (
    <div className="flex flex-col items-center my-4 max-w-[85vw]">
      <Badge text={props.title} />
      <Title text={props.header} />
      <p className='md:text-lg text-base text-center leading-6 my-2'>
        {props.description}
      </p>

      <div className="grid md:grid-cols-4 md:grid-rows-4 sm:grid-cols-2 sm:grid-rows-2 grid-cols-1 grid-rows-1 gap-2 md:w-auto w-4/5">
        {OBJECTIVE_ITEMS.map((item, index) => (
          <button key={index} className={`flex lg:flex-col justify-center items-center gap-2 p-2 border rounded-md transition-colors ${props.objectiveIds.find(objId => objId === item.id) ? 'border-gray-500' : 'border-gray-300'}`} onClick={() => props.onToggle(item.id)}>
            <img src={item.img} width={24} />
            <div className="text-lg">{item.text}</div>
          </button>
        ))}
      </div>
      {props.hasError && <p className="text-lg text-red-500 py-2">{props.errorMsg}</p>}

      <Button text="Tiếp tục" onClick={props.handleCheck} />
    </div>
  )
}

export default Page14