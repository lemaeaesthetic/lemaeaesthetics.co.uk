import React from "react";
import styles from "components/Sections/AboutUs/AboutUs.module.scss";
import { Section } from "components/Base/Section";
import { HeadingAndCopy } from "components/Base/HeadingAndCopy";
import { PictureWithCaption } from "components/Base/PictureWithCaption";

interface AboutUsSectionProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
}

const AboutUsSection: React.FC<AboutUsSectionProps> = ({
  testId,
  className,
  id,
  style,
}) => {
  // Change styles.component
  const classes = `${className ? `className ` : ""}${styles["about-us"]}`;
  // Alter render method

  return (
    <Section data-testid={testId} style={style} className={classes} id={id}>
      <HeadingAndCopy
        heading="About Us"
        copy={[
          "This is the section to tell users who you are and what your company is.",
          "It should not be suer long but it should be at least a few paragraphs.",
          "Remember on Desktop you will need to surface more text as there will be a lot more space to fill.",
        ]}
        link={{
          label: "Read More",
          href: "/about",
          title: "Read more about us",
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
