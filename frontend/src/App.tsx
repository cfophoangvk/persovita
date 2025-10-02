import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const callApi = async () => {
    console.log("Call Api");

    //lát hồi cài axios vào
    await fetch("http://localhost:6789/user")
    .then(res => res.text())
    .then(data => console.log(data))
    .catch(err => console.log("error from TL", err));
  }

  return (
    <>
      <button onClick={() => setCount((count) => count + 1)} className='px-2 py-2 bg-slate-500 rounded-md'>
        count is {count}
      </button>
      <button onClick={callApi} className='px-2 py-2 bg-slate-500 ml-3 rounded-md'>
        Call API
      </button>
      <h1 className='mt-10 text-9xl text-red-700'>If you see red text, the app is working!</h1>
    </>
  )
}

export default App
