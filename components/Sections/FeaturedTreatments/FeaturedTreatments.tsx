import React from "react";
import styles from "components/Sections/FeaturedTreatments/FeaturedTreatments.module.scss";
import { Container } from "components/Base/Container";
import { FeaturedTreatmentsIntro } from "./FeaturedTreatmentsIntro";
import { FeaturedTreatmentsSlider } from "./FeaturedTreatmentsSlider";

interface FeaturedTreatmentsSectionProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
}

const FeaturedTreatmentsSection: React.FC<FeaturedTreatmentsSectionProps> = ({
  testId,
  className,
  id,
  style,
}) => {
  return (
    <div
      data-testid={testId}
      style={style}
      className={`${className ? `${className} ` : ""}${styles.wrapper}`}
      id={id}
    >
      <FeaturedTreatmentsIntro />
      <Container className={styles.slider}>
        <FeaturedTreatmentsSlider />
      </Container>
    </div>
  );
};

FeaturedTreatmentsSection.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
};

export { FeaturedTreatmentsSection };
