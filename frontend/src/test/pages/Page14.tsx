import Badge from "../components/Badge"
import Button from "../components/Button"
import Header from "../components/Header"

const Page14 = (props: { onNext: () => void }) => {

  const items = [
    {
      img: "https://4deb4f30d3ceeb7ccf4ed7029328c64e.cdn.bubble.io/d75/f1681384164978x391115396823237700/CONCENTRATION.svg",
      text: "BRAIN"
    },
    {
      img: "https://4deb4f30d3ceeb7ccf4ed7029328c64e.cdn.bubble.io/d75/f1681384134082x548250670768886100/ENERGIE.svg",
      text: "ENERGY"
    },
    {
      img: "https://4deb4f30d3ceeb7ccf4ed7029328c64e.cdn.bubble.io/d75/f1681384106118x997605377907099600/COEUR.svg",
      text: "HEART AND CIRCULATION"
    },
    {
      img: "https://4deb4f30d3ceeb7ccf4ed7029328c64e.cdn.bubble.io/d75/f1681384076822x796228298301544300/IMMUNITE.svg",
      text: "IMMUNITY"
    },
    {
      img: "https://4deb4f30d3ceeb7ccf4ed7029328c64e.cdn.bubble.io/d75/f1681384045814x448479206965070000/PEAU.svg",
      text: "SKIN"
    },
    {
      img: "https://4deb4f30d3ceeb7ccf4ed7029328c64e.cdn.bubble.io/d75/f1681384013522x425435509155595700/CHEVEUX.svg",
      text: "HAIR"
    },
    {
      img: "https://4deb4f30d3ceeb7ccf4ed7029328c64e.cdn.bubble.io/d75/f1681383986534x128579618270027840/DIGESTION.svg",
      text: "DIGESTION"
    },
    {
      img: "https://4deb4f30d3ceeb7ccf4ed7029328c64e.cdn.bubble.io/d75/f1681383954402x218595271451047740/STRESS.svg",
      text: "STRESS"
    },
    {
      img: "https://4deb4f30d3ceeb7ccf4ed7029328c64e.cdn.bubble.io/d75/f1681383922950x181102217510529700/OS.svg",
      text: "BONES"
    },
    {
      img: "https://4deb4f30d3ceeb7ccf4ed7029328c64e.cdn.bubble.io/d75/f1681383891630x301349457589753700/SOMMEIL.svg",
      text: "SLEEP"
    },
    {
      img: "https://4deb4f30d3ceeb7ccf4ed7029328c64e.cdn.bubble.io/d75/f1681383769682x153512319427957280/MINCEUR.svg",
      text: "SHAPE"
    },
    {
      img: "https://4deb4f30d3ceeb7ccf4ed7029328c64e.cdn.bubble.io/d75/f1681383728550x669553097689538700/FEMININ.svg",
      text: "WOMEN'S HEALTH"
    },
    {
      img: "https://4deb4f30d3ceeb7ccf4ed7029328c64e.cdn.bubble.io/d75/f1681383681266x955836035817078300/MASCULIN.svg",
      text: "MEN'S HEALTH"
    },
    {
      img: "https://4deb4f30d3ceeb7ccf4ed7029328c64e.cdn.bubble.io/d75/f1681383642018x978651971131856600/SPORT.svg",
      text: "SPORT"
    },
    {
      img: "https://4deb4f30d3ceeb7ccf4ed7029328c64e.cdn.bubble.io/d75/f1681383801054x226175148529100580/GROSSESSE.svg",
      text: "CONCEPTION & MATERNITY"
    },
    {
      img: "https://4deb4f30d3ceeb7ccf4ed7029328c64e.cdn.bubble.io/d75/f1738008361730x986210485170354600/LONGEVITE.svg",
      text: "LONGEVITY"
    },
  ]

  return (
    <div className="flex flex-col items-center my-4">
      <Badge text="GOALS" />
      <Header text="What do you wish to improve?" />
      <p className='text-lg text-center leading-6 my-4'>
        Choose your current objectives and needs that you want to focus on, and we will build you a personalised recommendation accordingly.
      </p>

      <div className="grid grid-cols-4 grid-rows-4 gap-2 w-[600px]">
        {items.map((item, index) => (
          <button key={index} className="flex flex-col justify-center items-center gap-2 p-2 border border-t-0 border-gray-300 rounded-md">
            <img src={item.img} width={24} />
            <div className="text-lg">{item.text}</div>
          </button>
        ))}
      </div>

      <Button text="Next" onClick={props.onNext} />
    </div>
  )
}

export default Page14