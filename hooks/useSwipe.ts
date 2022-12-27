import {
  PointerEvent,
  PointerEventHandler,
  TouchEventHandler,
  TouchEvent,
  useState,
} from "react";

const useSwipe = <T extends HTMLElement>(
  leftCallback: any,
  rightCallback: any
) => {
  const [isTouching, setIsTouching] = useState(false);
  let initialTouch: number | undefined;
  let currentTouch: number | undefined;

  const handleTouchMove = (event: any) => {
    currentTouch = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: any) => {
    if (currentTouch && initialTouch && initialTouch - currentTouch < -50) {
      leftCallback(event);
    } else if (
      currentTouch &&
      initialTouch &&
      initialTouch - currentTouch > 50
    ) {
      rightCallback(event);
    }
    event.currentTarget.removeEventListener("touchmove", handleTouchMove);
    event.currentTarget.removeEventListener("touchend", handleTouchEnd);
    setIsTouching(false);
  };

  const handleMouseMove = (event: any) => {
    currentTouch = event.clientX;
  };

  const handlePointerUp = (event: any) => {
    if (currentTouch && initialTouch && initialTouch - currentTouch < -50) {
      leftCallback(event);
    } else if (
      currentTouch &&
      initialTouch &&
      initialTouch - currentTouch > 50
    ) {
      rightCallback(event);
    }
    event.currentTarget.removeEventListener("mousemove", handleMouseMove);
    event.currentTarget.removeEventListener("pointerup", handlePointerUp);
    setIsTouching(false);
  };

  const handleTouchStart: TouchEventHandler<T> = (event: TouchEvent<T>) => {
    if (isTouching) return;
    setIsTouching(true);
    initialTouch = event.touches[0].clientX;
    currentTouch = event.touches[0].clientX;
    event.currentTarget.addEventListener("touchmove", handleTouchMove);
    event.currentTarget.addEventListener("touchend", handleTouchEnd);
  };

  const handlePointerdown: PointerEventHandler<T> = (
    event: PointerEvent<T>
  ) => {
    if (isTouching) return;
    setIsTouching(true);
    initialTouch = event.clientX;
    currentTouch = event.clientX;
    event.currentTarget.addEventListener("mousemove", handleMouseMove);
    event.currentTarget.addEventListener("pointerup", handlePointerUp);
  };

  return {
    handleTouchStart,
    handlePointerdown,
  };
};

export { useSwipe };
