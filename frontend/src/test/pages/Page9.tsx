import { useState } from "react"
import Badge from "../components/Badge";
import Header from "../components/Header";
import Button from "../components/Button";

const Page9 = (props: { age: string, setAge: (age: string) => void, onNext: () => void }) => {
  const [hasError, setHasError] = useState<boolean>(false);

  const handleInput = () => {
    console.log(parseInt(props.age));
    if (!props.age || !Number(props.age)) {
      setHasError(true);
    } else if (Number(props.age) <= 0 || Number(props.age) >= 100) {
      setHasError(true);
    } else {
      setHasError(false);
      props.onNext();
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <Badge text="GENERAL" />
      <Header text="How old are you?" />
      <input
        type="text"
        placeholder="Type here..."
        className={`w-75 p-4 rounded-md ${hasError ? 'border-2 border-red-500' : 'border border-gray-300'}`}
        value={props.age}
        onChange={e => props.setAge(e.target.value)}
      />
      {hasError && <p className="w-full text-red-500 py-2">Please input a number between 0 and 100!</p>}
      <Button text="Next" onClick={handleInput} />
    </div>
  )
}

export default Page9