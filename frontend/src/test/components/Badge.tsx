const Badge = (props: { text: string }) => {
  return (
    <div className='px-2 py-1 border border-black rounded-full'>{props.text}</div>
  )
}

export default Badge