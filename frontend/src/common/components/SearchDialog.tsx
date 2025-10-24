import { X } from "lucide-react";

interface ISearchDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchDialog = (props: ISearchDialogProps) => {
  return (
    <div className={`fixed inset-0 bg-gray-500/75 z-50 h-screen text-sm transition-all ${props.isOpen ? '' : 'hidden'}`}>
      <div className="relative bg-white rounded-lg p-4 m-4 mt-20">
        <div className="flex gap-2 items-center">
          <input
            placeholder="Tìm sản phẩm..."
            className="flex-1 px-3 py-2 rounded w-full"
            onKeyDown={(e) => {
              if (e.key === "Enter") location.href = '/shop';
            }}
          />
          <X className="text-gray-400 hover:text-gray-600 z-10 cursor-pointer" onClick={() => props.setIsOpen(false)} />
        </div>
      </div>
    </div>
  )
}

export default SearchDialog