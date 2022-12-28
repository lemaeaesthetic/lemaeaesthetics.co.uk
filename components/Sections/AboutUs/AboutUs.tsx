import React from "react";
import styles from "components/Sections/AboutUs/AboutUs.module.scss";
import { Section } from "components/Base/Section";
import { HeadingAndCopy } from "components/Base/HeadingAndCopy";
import { PictureWithCaption } from "components/Base/PictureWithCaption";
import { PageSection } from "types/cms";

interface AboutUsSectionProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
  data: PageSection;
}

const AboutUsSection: React.FC<AboutUsSectionProps> = ({
  testId,
  className,
  id,
  style,
  data,
}) => {
  // Change styles.component
  const classes = `${className ? `className ` : ""}${styles["about-us"]}`;
  // Alter render method

  return (
    <Section data-testid={testId} style={style} className={classes} id={id}>
      <HeadingAndCopy
        heading={data.heading || "About Us"}
        copy={data.description || ""}
        link={{
          label: data.linkLabel || "Read More",
          href: data.linkUrl || "/about",
          title: data.linkLabel || "Read more about us",
        }}
      />
      <PictureWithCaption
        src="/assets/images/pic.jpeg"
        alt="/"
        caption="Hey there"
        className={styles["image-wrapper"]}
      />
    </Section>
  );
};

AboutUsSection.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
};

export { AboutUsSection };
