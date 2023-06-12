import { useRef, useEffect } from "react";

function Cursor() {
  const dot = useRef(null);
  const dotOutline = useRef(null);
  const cursorVisible = useRef(true);
  const cursorEnlarged = useRef(false);
  const endx = useRef(window.innerWidth / 2);
  const endy = useRef(window.innerHeight / 2);
  const _x = useRef(0);
  const _y = useRef(0);
  const requestRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", mouseOverEvent);
    document.addEventListener("mouseup", mouseOutEvent);
    document.addEventListener("mousemove", mouseMoveEvent);
    document.addEventListener("mouseenter", mouseEnterEvent);
    document.addEventListener("mouseleave", mouseLeaveEvent);

    return () => {
      document.removeEventListener("mousedown", mouseOverEvent);
      document.removeEventListener("mouseup", mouseOutEvent);
      document.removeEventListener("mousemove", mouseMoveEvent);
      document.removeEventListener("mouseenter", mouseEnterEvent);
      document.removeEventListener("mouseleave", mouseLeaveEvent);
    };
  }, []);

  const toggleCursorVisibility = () => {
    if (cursorVisible.current) {
      dot.current.style.opacity = 1;
      dotOutline.current.style.opacity = 1;
    } else {
      dot.current.style.opacity = 0;
      dotOutline.current.style.opacity = 0;
    }
  };
  const toggleCursorSize = () => {
    if (cursorEnlarged.current) {
      dot.current.style.transform = "translate(-50%,-50%) scale(0.75)";
      dotOutline.current.transform = "translate(-50%,-50%) scale(1.5)";
    } else {
      dot.current.style.transform = "translate(-50%,-50%) scale(1)";
      dotOutline.current.transform = "translate(-50%,-50%) scale(1)";
    }
  };
  const mouseOverEvent = () => {
    cursorEnlarged.current = true;
    toggleCursorSize();
  };
  const mouseOutEvent = () => {
    cursorEnlarged.current = false;
    toggleCursorSize();
  };
  const mouseEnterEvent = () => {
    cursorVisible.current = true;
    toggleCursorVisibility();
  };
  const mouseLeaveEvent = () => {
    cursorVisible.current = false;
    toggleCursorVisibility();
  };
  const mouseMoveEvent = (e) => {
    cursorVisible.current = true;
    toggleCursorVisibility();

    endx.current = e.pageX;
    endy.current = e.pageY;

    dot.current.style.top = endy.current + "px";
    dot.current.style.left = endx.current + "px";
    dotOutline.current.style.top = endy.current + "px";
    dotOutline.current.style.left = endx.current + "px";
  };

  return (
    <>
      <div ref={dotOutline} className="cursor-dot-outline"></div>
      <div ref={dot} className="cursor-dot"></div>
    </>
  );
}

export default Cursor;
