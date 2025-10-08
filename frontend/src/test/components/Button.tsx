const Button = (props: {disabled?: boolean, text: string, onClick: () => void}) => {
  return (
    <button className={`bg-stone-200 hover:bg-stone-400 transition-colors mt-15 px-10 py-3 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed}`} onClick={props.onClick} disabled={props.disabled ?? false}>
      {props.text}
    </button>
  )
}

export default Button