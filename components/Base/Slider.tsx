import React, { useState } from "react";
import { Container } from "components/Base/Container";
import { useSwipe } from "hooks/useSwipe";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import styles from "./Slider.module.scss"; // Add scss module

interface SliderProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
  slides: React.ReactNode[];
}

const Slider: React.FC<SliderProps> = ({
  testId,
  className,
  id,
  style,
  slides,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSwipeLeft = () => {
    if (activeSlide === 0) return;
    setActiveSlide(activeSlide - 1);
  };
  const handleSwipeRight = () => {
    if (activeSlide === slides.length - 1) return;
    setActiveSlide(activeSlide + 1);
  };

  const { handleMouseDown, handleTouchStart } = useSwipe<HTMLDivElement>(
    handleSwipeLeft,
    handleSwipeRight
  );
  // Change styles.component
  const classes = `${className ? `${className} ` : ""}${styles.wrapper}`;

  return (
    <Container data-testid={testId} className={classes} id={id} style={style}>
      <div className={styles.slider}>
        <div
          tabIndex={0}
          role="listbox"
          onTouchStart={handleTouchStart}
          onMouseDown={handleMouseDown}
          className={styles["slider-inner"]}
          style={{
            transform: `translateX(calc(100% - calc(${
              activeSlide + 1
            } * 100%)))`,
          }}
        >
          {slides?.map((slide) => {
            return (
              <div
                className={styles.slide}
                key={Math.random().toString(36).substring(2, 9)}
              >
                {slide}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.nav}>
        <button
          className={styles.trigger}
          type="button"
          disabled={activeSlide === 0}
          aria-label="Previous slide"
          onClick={() => {
            setActiveSlide(activeSlide - 1);
          }}
        >
          <FaChevronLeft size={20} />
        </button>
        <div className={styles.counter}>
          <span>{activeSlide + 1}</span>/<span>{slides?.length || 0}</span>
        </div>
        <button
          className={styles.trigger}
          type="button"
          disabled={activeSlide + 1 === slides?.length}
          aria-label="Next slide"
          onClick={() => {
            setActiveSlide(activeSlide + 1);
          }}
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </Container>
  );
};

Slider.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
};

export { Slider };
