import { useState } from "react"
import Badge from "../components/Badge";
import Header from "../components/Header";
import Button from "../components/Button";

const Page11 = (props: { email: string, setEmail: (email: string) => void, onNext: () => void }) => {
  const [hasError, setHasError] = useState<boolean>(false);

  const handleInput = () => {
    if (!props.email || !props.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      setHasError(true);
    } else {
      setHasError(false);
      props.onNext();
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <Badge text="GENERAL" />
      <Header text="What's your email?" />
      <input
        type="text"
        placeholder="Type here..."
        className={`w-75 p-4 rounded-md ${hasError ? 'border-2 border-red-500' : 'border border-gray-300'}`}
        value={props.email}
        onChange={e => props.setEmail(e.target.value)}
      />
      {hasError && <p className="w-full text-red-500 py-2">Please input email!</p>}
      <Button text="Next" onClick={handleInput} />
    </div>
  )
}

export default Page11