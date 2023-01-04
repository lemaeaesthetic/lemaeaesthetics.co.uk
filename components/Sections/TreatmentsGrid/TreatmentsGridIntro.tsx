import React from "react";
import { HeadingAndCopy } from "components/Base/HeadingAndCopy";

interface TreatmentsGridIntroProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
  linkLabel?: string;
  linkUrl?: string;
  heading: string;
  description: string;
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
}) => {
  const copy =
    "This is some random text about your treatments. Things like, our treatments are top tits.You probably want a couple lines, and not much more.";
  return (
    <HeadingAndCopy
      testId={testId}
      className={className}
      id={id}
      style={style}
      copy={description || copy}
      heading={heading || "Our Treatments"}
      link={{
        label: linkLabel || "View all",
        href: linkUrl || "/treatments",
        title: linkLabel || "View all of our treatments",
      }}
    />
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
