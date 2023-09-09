import React from "react";
import { CmsImage } from "types/cms";
import styles from "./GalleryGrid.module.scss"; // Add scss module
import { GalleryGridTile } from "./GalleryGridTile";

type GalleryGridProps = {
  id?: string;
  testId?: string;
  images: CmsImage[];
};

const GalleryGrid: React.FC<GalleryGridProps> = ({ testId, id, images }) => {
  // Alter render method
  return (
    <div data-testid={testId} id={id} className={styles.wrapper}>
      {images?.map((image) => (
        <GalleryGridTile key={image?.sys.id} image={image} />
      ))}
    </div>
  );
};

GalleryGrid.defaultProps = {
  id: undefined,
  testId: undefined,
};

export { GalleryGrid };
