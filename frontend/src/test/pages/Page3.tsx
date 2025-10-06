import Badge from "../components/Badge"
import Header from "../components/Header"

const Page3 = (props: { onNext: () => void }) => {
  return (
    <div className="flex flex-col items-center">
      <Badge text="GENERAL" />
      <Header text="When it comes to food supplements, you are:" />

      <div className="grid grid-cols-3 gap-2 w-[1000px]">
        <button className="flex justify-center items-center p-4 border border-t-0 border-gray-300 rounded-md" onClick={props.onNext}>
          <span className="text-xl p-2">👓</span>
          <div className="grow text-left">
            <h3>INFORMED</h3>
            <p>I know more than the average</p>
          </div>
        </button>

        <button className="flex justify-center items-center p-4 border border-t-0 border-gray-300 rounded-md" onClick={props.onNext}>
          <span className="text-xl p-2">🔍</span>
          <div className="grow text-left">
            <h3>CURIOUS</h3>
            <p>I want to know more</p>
          </div>
        </button>

        <button className="flex justify-center items-center p-4 border border-t-0 border-gray-300 rounded-md" onClick={props.onNext}>
          <span className="text-xl p-2">❓</span>
          <div className="grow text-left">
            <h3>SKEPTICAL</h3>
            <p>I'm not convinced yet</p>
          </div>
        </button>
      </div>
    </div>
  )
}

export default Page3