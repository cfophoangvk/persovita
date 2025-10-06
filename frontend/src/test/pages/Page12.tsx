const Page12 = (props: {onNext: () => void}) => {

  setTimeout(props.onNext, 3000);

  return (
    <div className="text-center">
      <div className="text-2xl">Great, now let's get to your goals!</div>
    </div>
  )
}

export default Page12