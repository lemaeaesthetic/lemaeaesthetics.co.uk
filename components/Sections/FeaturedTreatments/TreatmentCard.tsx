import React from "react";
import styles from "components/Sections/FeaturedTreatments/TreatmentCard.module.scss";
import { Anchor } from "components/Base/Anchor";
import { Treatment } from "types/cms";
import { Picture } from "components/Base/Picture";

interface TreatmentCardProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
  treatment: Treatment;
}

const TreatmentCard: React.FC<TreatmentCardProps> = ({
  testId,
  className,
  id,
  style,
  treatment,
}) => {
  return (
    <div
      data-testid={testId}
      style={style}
      className={`${className ? `${className} ` : ""}${styles.wrapper}`}
      id={id}
    >
      <div className={styles.image}>
        <Picture src={treatment.image.url} alt={treatment.image.alt} />
      </div>
      {treatment.name}
      <p>{treatment.description}</p>
      <Anchor
        href={`/treatments/${treatment.slug}`}
        label="More Info"
        title={`Read more about ${treatment.name}`}
      />
    </div>
  );
};

TreatmentCard.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
};

export { TreatmentCard };
