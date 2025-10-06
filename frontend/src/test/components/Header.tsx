const Header = (props: { text: string }) => {
  return (
    <h2 className="text-2xl my-10">{props.text}</h2>
  )
}

export default Header