import React from "react";
import styles from "components/Sections/FeaturedTreatments/FeaturedTreatments.module.scss";
import { Container } from "components/Base/Container";
import { selectTreatments } from "services/redux/treatmentsSlice";
import { useAppSelector } from "services/redux/hooks";
import { TreatmentCard } from "./TreatmentCard";

interface TreatmentsGridProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
}

const TreatmentsGrid: React.FC<TreatmentsGridProps> = ({
  testId,
  className,
  id,
  style,
}) => {
  const treatments = useAppSelector(selectTreatments());
  return (
    <div
      data-testid={testId}
      style={style}
      className={`${className ? `${className} ` : ""}${styles.wrapper}`}
      id={id}
    >
      <Container className={styles.slider}>
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
      </Container>
    </div>
  );
};

TreatmentsGrid.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
};

export { TreatmentsGrid };
