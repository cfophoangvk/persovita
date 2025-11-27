import { X } from "lucide-react";

const WhyAskDialog = (props: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
}) => {
  return (
    <div
      className={`fixed inset-0 bg-gray-500/75 z-50 h-screen text-sm transition-all ${
        props.isOpen ? "" : "hidden"
      }`}
    >
      <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[500px] bg-white transition-all overflow-hidden p-4 rounded-lg">
        <X
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 cursor-pointer"
          onClick={() => props.setIsOpen(false)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-teal-500 mx-auto"
          width="43"
          height="38"
          viewBox="0 0 43 38"
          fill="none"
        >
          <path
            d="M21.8631 24.4327C22.3592 24.4327 22.7613 24.0264 22.7613 23.5253C22.7613 23.0241 22.3592 22.6179 21.8631 22.6179C21.367 22.6179 20.9648 23.0241 20.9648 23.5253C20.9648 24.0264 21.367 24.4327 21.8631 24.4327Z"
            fill="#EF7A1A"
          />
          <path
            d="M16.999 11.5947C16.999 9.21755 18.2109 6.93092 21.4176 6.93092C24.2941 6.93092 25.8691 8.99365 25.5956 11.4232C25.2561 14.453 21.5449 15.1151 21.5449 20.3077"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.6371 37L19.1682 30.8071H37.38C37.38 30.8071 40.7092 30.6642 41.3458 27.7821C41.9824 24.9047 41.3458 4.02501 41.3458 4.02501C41.3458 4.02501 41.0299 1.14291 37.3658 1H4.0688C4.0688 1 1.36204 1.43351 1.04137 4.02501C0.965924 4.63954 1.01308 20.2171 1.03194 27.42C1.03666 29.2922 2.54094 30.8071 4.39418 30.8071H12.5805C12.6088 34.4228 12.6371 37 12.6371 37Z"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div className="text-center text-lg font-bold mt-10 mb-6">
          Vì sao chúng tôi hỏi câu này?
        </div>
        <div className="text-center text-lg mb-6">{props.text}</div>
        <div>
          <button
            className="bg-black rounded-full mx-auto cursor-pointer flex justify-center text-white w-3/5 py-3"
            onClick={() => props.setIsOpen(false)}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhyAskDialog;
