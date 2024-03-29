import React, { useState } from "react";
import styles from "components/Sections/FeaturedTreatments/FeaturedTreatmentsSlider.module.scss"; // Add scss module
import { Container } from "components/Base/Container";
import { useSwipe } from "hooks/useSwipe";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useAppSelector } from "services/redux/hooks";
import { selectTreatments } from "services/redux/treatmentsSlice";
import { TreatmentCard } from "components/TreatmentCard";

interface FeaturedTreatmentsSliderProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
}

const FeaturedTreatmentsSlider: React.FC<FeaturedTreatmentsSliderProps> = ({
  testId,
  className,
  id,
  style,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const treatments = useAppSelector(selectTreatments());
  const handleSwipeLeft = () => {
    if (activeSlide === 0) return;
    setActiveSlide(activeSlide - 1);
  };
  const handleSwipeRight = () => {
    if (activeSlide === treatments.length - 1) return;
    setActiveSlide(activeSlide + 1);
  };

  const { handleMouseDown, handleTouchStart } = useSwipe<HTMLDivElement>(
    handleSwipeLeft,
    handleSwipeRight
  );
  // Change styles.component
  const classes = `${className ? `className ` : ""}${styles.wrapper}`;

  return (
    <Container data-testid={testId} className={classes} id={id} style={style}>
      <div
        tabIndex={0}
        role="listbox"
        onTouchStart={handleTouchStart}
        onMouseDown={handleMouseDown}
        className={styles["slider-inner"]}
        style={{
          transform: `translateX(calc(100% - calc(${activeSlide + 1} * 100%)))`,
        }}
      >
        {treatments.map((treatment: any) => {
          return (
            <div
              className={styles.slide}
              key={Buffer.from(JSON.stringify(treatment)).toString("base64")}
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
