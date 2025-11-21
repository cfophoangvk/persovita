const Title = (props: { text: string }) => {
  return (
    <h2 className="md:text-2xl text-lg my-5 text-center font-bold">{props.text}</h2>
  )
}

export default Title