import { Container } from "components/Base/Container";

import { Slider } from "components/Base/Slider";
import React from "react";
import { CmsImage } from "types/cms";
import styles from "./Gallery.module.scss"; // Add scss module
import { GalleryGrid } from "./GalleryGrid";

interface GalleryProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
  gallery: CmsImage[];
  displayType?: "GRID" | "SLIDER";
}

const Gallery: React.FC<GalleryProps> = ({
  testId,
  className,
  id,
  style,
  gallery,
  displayType = "SLIDER",
}) => {
  // Change styles.Gallery
  const classes = `${className ? `${className} ` : ""}${styles.wrapper}`;
  // Alter render method
  return (
    <Container data-testid={testId} style={style} className={classes} id={id}>
      {displayType === "SLIDER" ? (
        <Slider
          slides={gallery?.map((image) => (
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
      ) : (
        <GalleryGrid images={gallery} />
      )}
    </Container>
  );
};

Gallery.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
  displayType: "GRID",
};

export { Gallery };
