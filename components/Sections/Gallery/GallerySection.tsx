import { Container } from "components/Base/Container";
import { HeadingAndCopy } from "components/Base/HeadingAndCopy";
import { Section } from "components/Base/Section";
import { Gallery } from "components/Gallery/Gallery";
import React from "react";
import { GallerySectionData } from "types/cms";
import styles from "./GallerySection.module.scss"; // Add scss module

interface GallerySectionProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
  data: GallerySectionData;
}

const GallerySection: React.FC<GallerySectionProps> = ({
  testId,
  className,
  id,
  style,
  data,
}) => {
  // Change styles.GallerySection
  const classes = `${className ? `${className} ` : ""}${styles.wrapper}`;
  // Alter render method
  return (
    <Section data-testid={testId} style={style} className={classes} id={id}>
      <Container
        className={`${styles.container} ${
          styles[data.displayType?.toLowerCase() || "slider"]
        }`}
      >
        <HeadingAndCopy
          className={styles.heading}
          heading={data.heading}
          copy={data.description}
        />
        <Gallery gallery={data.gallery} displayType={data.displayType} />
      </Container>
    </Section>
  );
};

GallerySection.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
};

export { GallerySection };
