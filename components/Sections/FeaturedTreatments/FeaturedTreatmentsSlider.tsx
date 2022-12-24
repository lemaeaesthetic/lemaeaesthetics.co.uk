import React, { useState } from "react";
import styles from "components/Sections/FeaturedTreatments/FeaturedTreatmentsSlider.module.scss"; // Add scss module
import { Container } from "components/Base/Container";
import { useSwipe } from "hooks/useSwipe";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { TreatmentCard } from "./TreatmentCard";

interface FeaturedTreatmentsSliderProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
  treatments: any[];
}

const FeaturedTreatmentsSlider: React.FC<FeaturedTreatmentsSliderProps> = ({
  testId,
  className,
  id,
  style,
  treatments,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSwipeLeft = () => {
    if (activeSlide === 0) return;
    setActiveSlide(activeSlide - 1);
  };
  const handleSwipeRight = () => {
    if (activeSlide === treatments.length - 1) return;
    setActiveSlide(activeSlide + 1);
  };

  const { handlePointerdown, handleTouchStart } = useSwipe<HTMLDivElement>(
    handleSwipeLeft,
    handleSwipeRight
  );
  // Change styles.component
  const classes = `${className ? `className ` : ""}${styles.wrapper}`;

  console.log(treatments);

  return (
    <Container data-testid={testId} className={classes} id={id} style={style}>
      <div
        onTouchStart={handleTouchStart}
        onPointerDown={handlePointerdown}
        className={styles["slider-inner"]}
        style={{
          transform: `translateX(calc(100% - calc(${activeSlide + 1} * 100%)))`,
        }}
      >
        {treatments.map((treatment: any) => {
          return (
            <div
              className={styles.slide}
              key={Math.random().toString(36).substring(2, 9)}
            >
              <TreatmentCard treatment={treatment} />
            </div>
          );
        })}
      </div>
      <div className={styles.nav}>
        <button
          className={styles.trigger}
          type="button"
          disabled={activeSlide === 0}
          aria-label="Previous Treatment"
          onClick={() => {
            setActiveSlide(activeSlide - 1);
          }}
        >
          <FaChevronLeft size={20} />
        </button>
        <div className={styles.counter}>
          <span>{activeSlide + 1}</span>/<span>{treatments.length}</span>
        </div>
        <button
          className={styles.trigger}
          type="button"
          disabled={activeSlide + 1 === treatments.length}
          aria-label="Next Treatment"
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

FeaturedTreatmentsSlider.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
};

export { FeaturedTreatmentsSlider };
