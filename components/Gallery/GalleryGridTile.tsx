import React from "react";
import { CmsImage } from "types/cms";
import { Picture } from "components/Base/Picture";
import { Anchor } from "components/Base/Anchor";
import styles from "./GalleryGridTile.module.scss"; // Add scss module

type GalleryGridTileProps = {
  id?: string;
  testId?: string;
  image: CmsImage;
};

const GalleryGridTile: React.FC<GalleryGridTileProps> = ({
  testId,
  id,
  image,
}) => {
  // Alter render method
  return (
    <div id={id} data-testid={testId} className={styles.wrapper}>
      <Anchor
        className={styles.button}
        href={image.url}
        title="View in fullscreen"
        rel="noopener norferrer"
        label=""
        target="_blank"
      >
        <Picture src={image.url} alt={image.alt} />
      </Anchor>
    </div>
  );
};

GalleryGridTile.defaultProps = {
  id: undefined,
  testId: undefined,
};

export { GalleryGridTile };
