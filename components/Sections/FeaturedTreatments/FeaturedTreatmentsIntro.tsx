import React from "react";
import { HeadingAndCopy } from "components/Base/HeadingAndCopy";

interface FeaturedTreatmentsIntroProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
}

const FeaturedTreatmentsIntro: React.FC<FeaturedTreatmentsIntroProps> = ({
  testId,
  className,
  id,
  style,
}) => {
  const copy =
    "This is some random text about your treatments. Things like, our treatments are top tits.You probably want a couple lines, and not much more.";
  return (
    <HeadingAndCopy
      testId={testId}
      className={className}
      id={id}
      style={style}
      copy={copy}
      heading="Our Treatments"
      link={{
        label: "View all",
        href: "/",
        title: "View all of our treatments",
      }}
    />
  );
};

FeaturedTreatmentsIntro.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
};

export { FeaturedTreatmentsIntro };
