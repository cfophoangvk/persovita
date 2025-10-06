import Badge from "../components/Badge"
import Header from "../components/Header"

const Page5 = (props: { onNext: () => void }) => {
  return (
    <div className="flex flex-col items-center">
      <Badge text="GENERAL" />
      <Header text="Are you taking any supplements?" />

      <div className="grid grid-cols-2 gap-4 w-[600px]">
        <button className="flex justify-center text-lg px-2 py-6 items-center border border-gray-500 rounded-md" onClick={props.onNext}>
          YES
        </button>
        <button className="flex justify-center text-lg px-2 py-6 items-center border border-gray-500 rounded-md" onClick={props.onNext}>
          NO
        </button>
      </div>
    </div>
  )
}

export default Page5