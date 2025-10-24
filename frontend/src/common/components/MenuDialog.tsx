import { X } from "lucide-react";
import { Link } from "react-router-dom";

interface IMenuDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const MenuDialog = (props: IMenuDialogProps) => {
  return (
    <div className={`fixed inset-0 bg-gray-500/75 z-50 h-screen text-sm 
      transition-opacity duration-300 
      ${props.isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`relative bg-white rounded-lg w-screen h-screen px-5 py-2 
        transform transition-transform duration-300 ease-out
        ${props.isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-end">
          <X className="text-gray-400 hover:text-gray-600 z-10 cursor-pointer" onClick={() => props.setIsOpen(false)} />
        </div>
        <div className="flex flex-col gap-3 w-1/2">
          <Link
            to="/test/page1"
            className="px-4 py-2 bg-teal-500 text-white rounded-full text-sm font-medium hover:bg-teal-600 transition duration-150"
            onClick={() => props.setIsOpen(false)}
          >
            Làm bài kiểm tra
          </Link>
          <Link
            to="/shop"
            className="text-sm text-gray-700 px-2 py-2 hover:text-teal-600 rounded-full hover:bg-gray-200/50 transition duration-150"
            onClick={() => props.setIsOpen(false)}
          >
            Sản phẩm
          </Link>
          <Link
            to="/about"
            className="text-sm text-gray-700 px-2 py-2 hover:text-teal-600 rounded-full hover:bg-gray-200/50 transition duration-150"
            onClick={() => props.setIsOpen(false)}
          >
            Về chúng tôi
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MenuDialog