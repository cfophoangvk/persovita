const Badge = (props: { text: string, image?: string }) => {
  return (
    <div className='px-2 py-1 border border-black rounded-full flex items-center justify-center gap-1'>
      {props.image && <img src={props.image} width={14} />}
      <div>{props.text}</div>
    </div>
  )
}

export default Badge