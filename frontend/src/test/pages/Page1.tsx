import { useState } from "react"
import Badge from "../components/Badge";
import Header from "../components/Header";
import Button from "../components/Button";

const Page1 = (props: { name: string, setName: (name: string) => void, onNext: () => void }) => {
  const [hasError, setHasError] = useState<boolean>(false);

  const handleInput = () => {
    if (!props.name) {
      setHasError(true);
    } else {
      setHasError(false);
      props.onNext();
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <Badge text="GENERAL" />
      <Header text="What is your name?"/>
      <input
        type="text"
        placeholder="Write here..."
        className={`p-4 rounded-md ${hasError ? 'border-2 border-red-500' : 'border border-gray-300'}`}
        value={props.name}
        onChange={e => props.setName(e.target.value)}
      />
      {hasError && <p className="w-full text-red-500 py-2">Please input name!</p>}
      <Button text="Next" onClick={handleInput}/>
    </div>
  )
}

export default Page1