import Badge from "../components/Badge";
import Header from "../components/Header";
import Button from "../components/Button";
import type { InputProps } from "../interfaces/InputProps";

const Input = (props: InputProps) => {
  return (
    <div className='flex flex-col items-center'>
      <Badge text={props.title} />
      <Header text={props.description} />
      <input
        type="text"
        placeholder="Nhập vào đây..."
        className={`p-4 rounded-md ${props.hasError ? 'border-2 border-red-500' : 'border border-gray-300'}`}
        value={props.value}
        onChange={e => props.setValue(e.target.value)}
      />
      {props.hasError && <p className="w-full text-red-500 py-2">{props.errorMsg}</p>}
      <Button text="Tiếp tục" onClick={props.handleInput} />
    </div>
  )
}

export default Input