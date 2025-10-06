const Page4 = (props: {onNext: () => void}) => {

  setTimeout(props.onNext, 3000);

  return (
    <div className="text-center">
      <div className="text-2xl">Perfect, we will try to satisfy your curiousity!</div>
      <div className="text-lg mt-4">Don't worry, it will take less than 5 minutes.</div>
    </div>
  )
}

export default Page4