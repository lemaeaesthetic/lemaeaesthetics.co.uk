import React from "react";
import { HeadingAndCopy } from "components/Base/HeadingAndCopy";
import { TreatmentCard } from "components/TreatmentCard";
import styles from "./TreatmentsGridIntro.module.scss";

interface TreatmentsGridIntroProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
  linkLabel?: string;
  linkUrl?: string;
  heading: string;
  description: string;
  featuredTreatment: any;
}

const TreatmentsGridIntro: React.FC<TreatmentsGridIntroProps> = ({
  testId,
  className,
  id,
  style,
  linkLabel,
  linkUrl,
  heading,
  description,
  featuredTreatment,
}) => {
  const classes = className ? `${className} ${styles.wrapper}` : styles.wrapper;
  return (
    <div className={classes}>
      <HeadingAndCopy
        testId={testId}
        className={styles["copy-wrapper"]}
        id={id}
        style={style}
        copy={description || ""}
        heading={heading || "Our Treatments"}
        link={
          linkLabel && linkUrl
            ? {
                label: linkLabel || "View all",
                href: linkUrl || "/treatments",
                title: linkLabel || "View all of our treatments",
              }
            : undefined
        }
      />
      <TreatmentCard treatment={featuredTreatment} />
    </div>
  );
};

TreatmentsGridIntro.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
  linkLabel: undefined,
  linkUrl: undefined,
};

export { TreatmentsGridIntro };
