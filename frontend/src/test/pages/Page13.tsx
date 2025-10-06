import Badge from "../components/Badge"
import Header from "../components/Header"

const Page13 = (props: { onNext: () => void }) => {
  return (
    <div className="flex flex-col items-center">
      <Badge text="GOALS" />
      <Header text="What is your main purpose?" />

      <div className="grid grid-cols-3 gap-2 w-[1000px]">
        <button className="flex justify-center items-center gap-2 p-4 border border-t-0 border-gray-300 rounded-md" onClick={props.onNext}>
          <img src="https://4deb4f30d3ceeb7ccf4ed7029328c64e.cdn.bubble.io/d75/f1663610411874x996794460918720900/SCREEN%2014%20BESOINS%20SPECIFIQUES.svg" width={20} />
          <div className="grow text-left">
            <h3>SPECIFIC NEEDS</h3>
            <p>I have an identified goal</p>
          </div>
        </button>

        <button className="flex justify-center items-center gap-2 p-4 border border-t-0 border-gray-300 rounded-md" onClick={props.onNext}>
          <img src="https://4deb4f30d3ceeb7ccf4ed7029328c64e.cdn.bubble.io/d75/f1663610418666x220115074533514980/SCREEN%2014%20BIEN-%C3%8ATRE.svg" width={20} />
          <div className="grow text-left">
            <h3>JUST WANT TO FEEL GOOD</h3>
            <p>I want to look after myself</p>
          </div>
        </button>

        <button className="flex justify-center items-center gap-2 p-4 border border-t-0 border-gray-300 rounded-md" onClick={props.onNext}>
          <img src="https://4deb4f30d3ceeb7ccf4ed7029328c64e.cdn.bubble.io/d75/f1663610425606x156964802306965630/SCREEN%2014%20DECOUVERTE.svg" width={20} />
          <div className="grow text-left">
            <h3>LOOKING FOR SOMETHING NEW</h3>
            <p>I want to discover new things</p>
          </div>
        </button>
      </div>
    </div>
  )
}

export default Page13