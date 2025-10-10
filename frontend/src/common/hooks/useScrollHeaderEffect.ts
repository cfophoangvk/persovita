import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

function useScrollHeaderEffect() {
  const [show, setShow] = useState(true);
  const lastY = useRef(0);

  // Dùng motion để lấy giá trị scroll
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < 80) {
      setShow(true);
      lastY.current = latest;
      return;
    }
    if (latest > lastY.current) {
      // Cuộn xuống -> ẩn header
      setShow(true);
    } else if (latest < lastY.current) {
      // Cuộn lên -> hiện header
      setShow(false);
    }
    lastY.current = latest;
  });
  return { show };
}

export default useScrollHeaderEffect;
