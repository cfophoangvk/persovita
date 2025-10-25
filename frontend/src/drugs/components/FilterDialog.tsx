import { X } from "lucide-react";

interface ISortDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  brandsAvailable: {
    id: string,
    name: string
  }[],
  selectedBrandIds: string[],
  toggleBrand: (id: string) => void,
  featuresAvailable: {
    id: string;
    title: string;
  }[],
  selectedFeatureIds: string[],
  toggleFeature: (id: string) => void,
  onReset: () => void
}

export const FilterDialog = (props: ISortDialogProps) => (
  <div className={`fixed inset-0 z-50 flex flex-col justify-end transition-opacity duration-300 ${props.isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
    <div className="absolute inset-0 bg-black/40" onClick={() => props.setIsOpen(false)} />
    <div className={`bg-white w-full rounded-t-2xl p-5 z-1 relative transform transition-transform duration-300 ease-out ${props.isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
      <button onClick={() => props.setIsOpen(false)} className="absolute top-4 right-4 cursor-pointer">
        <X size={24} />
      </button>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Danh mục thương hiệu
        </label>
        <div className="space-y-2 text-sm text-gray-700 max-h-56 overflow-auto pr-2 mb-4">
          {props.brandsAvailable.length ? (
            props.brandsAvailable.map((c) => (
              <label key={c.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={props.selectedBrandIds.includes(c.id)}
                  onChange={() => props.toggleBrand(c.id)}
                  className="w-4 h-4"
                />
                <span>{c.name}</span>
              </label>
            ))
          ) : (
            <div className="text-sm text-gray-400">
              Không có danh mục
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Danh mục chức năng
        </label>
        <div className="space-y-2 text-sm text-gray-700 max-h-56 overflow-auto pr-2 mb-4">
          {props.featuresAvailable.length ? (
            props.featuresAvailable.map((t) => (
              <label key={t.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={props.selectedFeatureIds.includes(t.id)}
                  onChange={() => props.toggleFeature(t.id)}
                  className="w-4 h-4"
                />
                <span>{t.title}</span>
              </label>
            ))
          ) : (
            <div className="text-sm text-gray-400">
              Không có chức năng
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 m-auto">
        <button className="flex-1 py-2 rounded-full border border-gray-300 bg-teal-300 text-sm hover:bg-teal-400 transition"
        onClick={props.onReset}>
          Đặt lại
        </button>
      </div>
    </div>
  </div>
);