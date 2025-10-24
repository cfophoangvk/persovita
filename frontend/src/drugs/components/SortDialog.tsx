import { X } from "lucide-react";

interface ISortDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sortBy: "name-asc" | "name-desc" | "price-asc" | "price-desc";
  setSortBy: React.Dispatch<React.SetStateAction<"name-asc" | "name-desc" | "price-asc" | "price-desc">>;
}

export const SortDialog = (props: ISortDialogProps) => (
  <div className={`fixed inset-0 z-50 flex flex-col justify-end transition-opacity duration-300 ${props.isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
    <div className="absolute inset-0 bg-black/40" onClick={() => props.setIsOpen(false)} />
    <div className={`bg-white w-full rounded-t-2xl p-5 z-1 relative transform transition-transform duration-300 ease-out ${props.isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
      <button onClick={() => props.setIsOpen(false)} className="absolute top-4 right-4 cursor-pointer">
        <X size={24} />
      </button>
      <div>
        <div className="font-bold">Sắp xếp theo</div>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input type="radio" name="option" value="name-asc" className="sr-only peer" checked={props.sortBy === "name-asc"}
            onChange={(e) => props.setSortBy(e.target.value as "name-asc" | "name-desc" | "price-asc" | "price-desc")}/>
          <div
            className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center peer-checked:bg-orange-400 peer-checked:border-orange-400"
          >
            <div
              className="w-2 h-2 rounded-full bg-white block"
            ></div>
          </div>
          <span>Từ A-Z</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input type="radio" name="option" value="name-desc" className="sr-only peer" checked={props.sortBy === "name-desc"}
            onChange={(e) => props.setSortBy(e.target.value as "name-asc" | "name-desc" | "price-asc" | "price-desc")} />
          <div
            className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center peer-checked:bg-orange-400 peer-checked:border-orange-400"
          >
            <div
              className="w-2 h-2 rounded-full bg-white block"
            ></div>
          </div>
          <span>Từ Z-A</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input type="radio" name="option" value="price-asc" className="sr-only peer" checked={props.sortBy === "price-asc"}
            onChange={(e) => props.setSortBy(e.target.value as "name-asc" | "name-desc" | "price-asc" | "price-desc")} />
          <div
            className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center peer-checked:bg-orange-400 peer-checked:border-orange-400"
          >
            <div
              className="w-2 h-2 rounded-full bg-white block"
            ></div>
          </div>
          <span>Giá thấp nhất</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input type="radio" name="option" value="price-desc" className="sr-only peer" checked={props.sortBy === "price-desc"}
            onChange={(e) => props.setSortBy(e.target.value as "name-asc" | "name-desc" | "price-asc" | "price-desc")} />
          <div
            className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center peer-checked:bg-orange-400 peer-checked:border-orange-400"
          >
            <div
              className="w-2 h-2 rounded-full bg-white block"
            ></div>
          </div>
          <span>Giá cao nhất</span>
        </label>
      </div>
    </div>
  </div>
);