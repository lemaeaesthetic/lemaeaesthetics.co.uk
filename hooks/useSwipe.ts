import {
  MouseEvent,
  MouseEventHandler,
  TouchEventHandler,
  TouchEvent,
} from "react";
import { isTouchDevice } from "utils/identifiers";

const useSwipe = <T extends HTMLElement>(
  leftCallback: any,
  rightCallback: any
) => {
  let isTouching = false;
  let initialTouch: number | undefined;
  let currentTouch: number | undefined;

  const handleTouchMove = (event: any) => {
    currentTouch = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: any) => {
    isTouching = false;
    if (currentTouch && initialTouch && initialTouch - currentTouch < 0) {
      leftCallback(event);
    } else if (
      currentTouch &&
      initialTouch &&
      initialTouch - currentTouch > 0
    ) {
      rightCallback(event);
    }
    initialTouch = undefined;
    currentTouch = undefined;
    event.currentTarget.removeEventListener("touchmove", handleTouchMove);
    event.currentTarget.removeEventListener("touchend", handleTouchEnd);
  };

  const handleMouseMove = (event: any) => {
    currentTouch = event.clientX;
  };

  const handleMouseUp = (event: any) => {
    if (currentTouch && initialTouch && initialTouch - currentTouch < 0) {
      leftCallback(event);
    } else if (
      currentTouch &&
      initialTouch &&
      initialTouch - currentTouch > 0
    ) {
      rightCallback(event);
    }
    event.currentTarget.removeEventListener("mousemove", handleMouseMove);
    event.currentTarget.removeEventListener("mouseup", handleMouseUp);
    isTouching = false;
  };

  const handleTouchStart: TouchEventHandler<T> = (event: TouchEvent<T>) => {
    if (!isTouchDevice()) return;
    if (isTouching) return;
    isTouching = true;
    initialTouch = event.touches[0].clientX;
    event.currentTarget.addEventListener("touchmove", handleTouchMove);
    event.currentTarget.addEventListener("touchend", handleTouchEnd);
  };

  const handleMouseDown: MouseEventHandler<T> = (event: MouseEvent<T>) => {
    if (isTouchDevice()) return;
    if (isTouching) return;
    isTouching = true;
    initialTouch = event.clientX;
    currentTouch = event.clientX;
    event.currentTarget.addEventListener("mousemove", handleMouseMove);
    event.currentTarget.addEventListener("mouseup", handleMouseUp);
  };

  return {
    handleTouchStart,
    handleMouseDown,
  };
};

export { useSwipe };
