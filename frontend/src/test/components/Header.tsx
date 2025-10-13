import { Link } from "react-router-dom"

const Header = (props: {currentProgress: number}) => {
  return (
    <div className='fixed top-0 left-0 right-0 py-3 text-center bg-white border-b border-black h-[64.8px] z-1'>
      <Link to="/"
        className="text-2xl font-extrabold tracking-widest text-amber-400 hover:text-amber-600 transition duration-150"
      >
        PERSOVITA
      </Link>

      <div className="w-[95%] mx-auto mt-1 bg-gray-200 rounded-full h-4 dark:bg-gray-700 text-center relative text-xs">
        <div className="bg-gray-600 h-4 rounded-full transition-all" style={{ width: `${props.currentProgress}%` }}></div>
        <div className={`absolute inset-0 font-bold text-center ${props.currentProgress > 50 ? 'text-white' : 'text-black' }`}>
          {props.currentProgress.toFixed(0)}%
        </div>
      </div>
    </div>
  )
}

export default Header