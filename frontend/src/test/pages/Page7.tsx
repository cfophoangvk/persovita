import Badge from "../components/Badge"
import Header from "../components/Header"

const Page7 = (props: { onNext: () => void }) => {
  return (
    <div className="flex flex-col items-center">
      <Badge text="GENERAL" />
      <Header text="How frequently do you take supplements?" />

      <div className="grid grid-cols-3 gap-4 w-[800px]">
        <button className="flex justify-center text-lg px-2 py-6 items-center border border-gray-500 rounded-md" onClick={props.onNext}>
          NEVER
        </button>
        <button className="flex justify-center text-lg px-2 py-6 items-center border border-gray-500 rounded-md" onClick={props.onNext}>
          ALMOST EVERY DAY
        </button>
        <button className="flex justify-center text-lg px-2 py-6 items-center border border-gray-500 rounded-md" onClick={props.onNext}>
          EVERYDAY
        </button>
      </div>
    </div>
  )
}

export default Page7