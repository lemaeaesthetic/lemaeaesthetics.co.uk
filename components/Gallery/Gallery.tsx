import { Container } from "components/Base/Container";

import { Slider } from "components/Base/Slider";
import React from "react";
import { CmsImage } from "types/cms";
import styles from "./Gallery.module.scss"; // Add scss module

interface GalleryProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
  gallery: CmsImage[];
}

const Gallery: React.FC<GalleryProps> = ({
  testId,
  className,
  id,
  style,
  gallery,
}) => {
  // Change styles.Gallery
  const classes = `${className ? `${className} ` : ""}${styles.wrapper}`;
  // Alter render method
  return (
    <Container data-testid={testId} style={style} className={classes} id={id}>
      <Slider
        slides={gallery.map((image) => (
          <div
            key={Math.random().toString(36).substring(2, 9)}
            className={styles["slide-wrapper"]}
          >
            <div
              className={styles["slide-inner"]}
              style={{ backgroundImage: `url("${image.url}")` }}
            />
          </div>
        ))}
      />
    </Container>
  );
};

Gallery.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
};

export { Gallery };
