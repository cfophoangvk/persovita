import Badge from "../components/Badge"
import Header from "../components/Header"

const Page6 = (props: { onNext: () => void }) => {
  return (
    <div className="flex flex-col items-center">
      <Badge text="GENERAL" />
      <Header text="How many supplements do you normally take?" />

      <div className="grid grid-cols-2 gap-4 w-[600px]">
        <button className="flex text-lg px-3 py-6 items-center gap-3 border border-gray-500 rounded-md" onClick={props.onNext}>
          <img src="https://4deb4f30d3ceeb7ccf4ed7029328c64e.cdn.bubble.io/d75/f1663610349653x347678680577069060/SCREEN%205%201-5%20GELULES.svg" width={20} />
          <div className="text-lg">1-4</div>
        </button>
        <button className="flex text-lg px-3 py-6 items-center gap-3 border border-gray-500 rounded-md" onClick={props.onNext}>
          <img src="https://4deb4f30d3ceeb7ccf4ed7029328c64e.cdn.bubble.io/d75/f1663610355518x207821690077530050/SCREEN%205%205%20GELULES.svg" width={20}/>
          <div className="text-lg">5+</div>
        </button>
      </div>
    </div>
  )
}

export default Page6