import React from "react";
import { Container } from "components/Base/Container";
import { GenericPageSection } from "types/cms";
import { selectTreatments } from "services/redux/treatmentsSlice";
import { useAppSelector } from "services/redux/hooks";
import styles from "./TreatmentsGrid.module.scss";
import { TreatmentsGridIntro } from "./TreatmentsGridIntro";
import { TreatmentCard } from "./TreatmentCard";

interface TreatmentsGridProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
  data: GenericPageSection;
}

const TreatmentsGrid: React.FC<TreatmentsGridProps> = ({
  testId,
  className,
  id,
  style,
  data,
}) => {
  const treatments = useAppSelector(selectTreatments());
  return (
    <div
      data-testid={testId}
      style={style}
      className={`${className ? `${className} ` : ""}${styles.wrapper}`}
      id={id}
    >
      {data.heading && data.description ? (
        <TreatmentsGridIntro
          heading={data.heading}
          description={data.description}
          linkUrl={data.linkUrl}
          linkLabel={data.linkLabel}
        />
      ) : null}
      <Container className={styles.grid}>
        {treatments.map((treatment: any) => {
          return (
            <div
              className={styles.tile}
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
