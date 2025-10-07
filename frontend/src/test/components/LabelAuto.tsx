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
    <div className="text-center">
      <div className="text-2xl">{props.title}</div>
      <div className="text-lg mt-4">{props.description}</div>
    </div>
  )
}

export default LabelAuto