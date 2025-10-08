import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className='fixed top-0 left-0 right-0 py-3 text-center bg-white border-b border-black h-[64.8px]'>
      <Link
              to="/"
        className="text-2xl font-extrabold tracking-widest text-amber-400 hover:text-amber-600 transition duration-150"
      >
        PERSOVITA
      </Link>
    </div>
  )
}

export default Header