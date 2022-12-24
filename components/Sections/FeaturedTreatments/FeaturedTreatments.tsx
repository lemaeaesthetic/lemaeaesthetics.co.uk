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
  treatments: any[];
}

const FeaturedTreatmentsSection: React.FC<FeaturedTreatmentsSectionProps> = ({
  testId,
  className,
  id,
  treatments,
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
        <FeaturedTreatmentsSlider treatments={treatments} />
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
