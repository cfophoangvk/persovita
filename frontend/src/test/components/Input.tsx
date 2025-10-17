import Badge from "../components/Badge";
import Title from "./Title";
import Button from "../components/Button";
import type { InputProps } from "../interfaces/InputProps";

const Input = (props: InputProps) => {

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      props.handleInput();
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <Badge text={props.title} />
      <Title text={props.description} />
      <input
        type="text"
        placeholder="Nhập vào đây..."
        className={`p-4 w-64 rounded-md ${props.hasError ? 'border-2 border-red-500' : 'border border-gray-300'}`}
        value={props.value}
        onChange={e => props.setValue(e.target.value)}
        onKeyDown={e => handleKeyDown(e)}
      />
      {props.hasError && <p className="w-full text-red-500 py-2">{props.errorMsg}</p>}
      <Button text="Tiếp tục" onClick={props.handleInput} />
    </div>
  )
}

export default Input