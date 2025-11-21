import { X } from "lucide-react"
import { ICON } from "../constants/icon"

const WhyAskDialog = (props: { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, text: string }) => {
  return (
    <div className={`fixed inset-0 bg-gray-500/75 z-50 h-screen text-sm transition-all ${props.isOpen ? '' : 'hidden'}`}>
      <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[500px] bg-white transition-all overflow-hidden p-4 rounded-lg">
        <X className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 cursor-pointer" onClick={() => props.setIsOpen(false)} />
        <img src={ICON.INFO} className="mx-auto" alt="Info" />
        <div className='text-center font-bold mt-10 mb-6'>Vì sao chúng tôi hỏi câu này?</div>
        <div className="text-center mb-6">
          {props.text}
        </div>
        <div>
          <button className="bg-black rounded-full mx-auto cursor-pointer flex justify-center text-white w-3/5 py-3" onClick={() => props.setIsOpen(false)}>OK</button>
        </div>
      </div>
    </div>
  )
}

export default WhyAskDialog