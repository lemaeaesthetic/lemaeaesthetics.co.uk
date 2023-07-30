import React from "react";
import styles from "components/Sections/TextImageSection/TextImageSection.module.scss";
import { Section } from "components/Base/Section";
import { HeadingAndCopy } from "components/Base/HeadingAndCopy";
import { PictureWithCaption } from "components/Base/PictureWithCaption";
import { TextImageSection as TextImageSectionType } from "types/cms";

interface TextImageSectionProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
  data: TextImageSectionType;
}

const TextImageSection: React.FC<TextImageSectionProps> = ({
  testId,
  className,
  id,
  style,
  data,
}) => {
  // Change styles.component
  const classes = `${className ? `className ` : ""}${styles["text-image"]}`;
  // Alter render method

  return (
    <Section data-testid={testId} style={style} className={classes} id={id}>
      <HeadingAndCopy
        className={styles["text-wrapper"]}
        heading={data.heading || "About Us"}
        copy={data.description || ""}
        link={{
          label: data.linkLabel || "Read More",
          href: data.linkUrl || "/about",
          title: data.linkLabel || "Read more about us",
        }}
      />
      <PictureWithCaption
        src={data.image.url}
        alt={data.image.alt}
        caption={data.image.description}
        className={styles["image-wrapper"]}
      />
    </Section>
  );
};

TextImageSection.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
};

export { TextImageSection };
