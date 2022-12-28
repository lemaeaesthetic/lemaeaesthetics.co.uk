import React from "react";
import styles from "components/Sections/FeaturedTreatments/TreatmentCard.module.scss";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Anchor } from "components/Base/Anchor";

interface TreatmentCardProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
  treatment: any;
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
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${treatment.image.url})` }}
      />
      {treatment.name}
      {documentToReactComponents(treatment.content.json)}
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
