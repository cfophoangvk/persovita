import Badge from "../components/Badge"
import Button from "../components/Button"
import Header from "../components/Header"
import { ICON } from "../constants/icon"
import { SECTION } from "../constants/section"

const Page14 = (props: { title: string, header: string, description: string, objectiveIds: number[], onToggle: (id: number) => void, hasError: boolean, errorMsg: string, handleCheck: () => void }) => {
  const items = [
    {
      id: 1,
      img: ICON.BRAIN,
      text: SECTION.BRAIN
    },
    {
      id: 2,
      img: ICON.ENERGY,
      text: SECTION.ENERGY
    },
    {
      id: 3,
      img: ICON.HEART,
      text: SECTION.HEART
    },
    {
      id: 4,
      img: ICON.IMMUNITY,
      text: SECTION.IMMUNITY
    },
    {
      id: 5,
      img: ICON.SKIN,
      text: SECTION.SKIN
    },
    {
      id: 6,
      img: ICON.HAIR,
      text: SECTION.HAIR
    },
    {
      id: 7,
      img: ICON.DIGESTION,
      text: SECTION.DIGESTION
    },
    {
      id: 8,
      img: ICON.STRESS,
      text: SECTION.STRESS
    },
    {
      id: 9,
      img: ICON.BONE,
      text: SECTION.BONES
    },
    {
      id: 10,
      img: ICON.MOON,
      text: SECTION.SLEEP
    },
    {
      id: 11,
      img: ICON.APPLE,
      text: SECTION.SHAPE
    },
    {
      id: 12,
      img: ICON.WOMEN,
      text: SECTION.WOMEN_HEALTH
    },
    {
      id: 13,
      img: ICON.MEN,
      text: SECTION.MEN_HEALTH
    },
    {
      id: 14,
      img: ICON.SPORT,
      text: SECTION.SPORT
    },
    {
      id: 15,
      img: ICON.PREGNANT,
      text: SECTION.CONCEPTION_MATERNITY
    },
    {
      id: 16,
      img: ICON.LONGEVITY,
      text: SECTION.LONGEVITY
    },
  ]

  return (
    <div className="flex flex-col items-center my-4">
      <Badge text={props.title} />
      <Header text={props.header} />
      <p className='text-lg text-center leading-6 my-4'>
        {props.description}
      </p>

      <div className="grid grid-cols-4 grid-rows-4 gap-2 w-[600px]">
        {items.map((item, index) => (
          <button key={index} className={`flex flex-col justify-center items-center gap-2 p-2 border rounded-md transition-colors ${props.objectiveIds.find(objId => objId === item.id) ? 'border-gray-500' : 'border-gray-300'}`} onClick={() => props.onToggle(item.id)}>
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