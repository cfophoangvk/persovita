import Badge from "../components/Badge"
import Header from "../components/Header"

const Page8 = (props: { onNext: () => void }) => {
  return (
    <div className="flex flex-col items-center">
      <Badge text="GENERAL" />
      <Header text="What is your biological sex?" />

      <div className="grid grid-cols-2 gap-4 w-[600px]">
        <button className="flex justify-center text-lg px-2 py-6 items-center border border-gray-500 rounded-md" onClick={props.onNext}>
          MALE
        </button>
        <button className="flex justify-center text-lg px-2 py-6 items-center border border-gray-500 rounded-md" onClick={props.onNext}>
          FEMALE
        </button>
      </div>
    </div>
  )
}

export default Page8