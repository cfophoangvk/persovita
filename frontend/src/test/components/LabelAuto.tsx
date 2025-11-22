import { useEffect } from "react";
import type { LabelAutoProps } from "../interfaces/LabelAutoProps";

const LabelAuto = (props: LabelAutoProps) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      props.onNext();
    }, 3000);
    return () => clearTimeout(timer);
  }, [props.onNext]);

  return (
    <div className="text-center max-w-[90vw]">
      <div className="md:text-2xl text-lg font-bold">{props.title}</div>
      <div className="md:text-lg text-md mt-4">{props.description}</div>
    </div>
  )
}

export default LabelAuto