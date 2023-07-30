import React from "react";
import styles from "components/Base/PictureWithCaption.module.scss"; // Add scss module
import { Picture } from "./Picture";

interface PictureWithCaptionProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
  src: string;
  caption?: string;
  alt: string;
}

const PictureWithCaption: React.FC<PictureWithCaptionProps> = ({
  testId,
  className,
  id,
  style,
  src,
  alt,
  caption,
}) => {
  // Change styles.component
  const classes = `${className ? `${className} ` : ""}${styles.wrapper}`;
  // Alter render method

  return (
    <div data-testid={testId} style={style} className={classes} id={id}>
      <Picture src={src} alt={alt} />
      {caption ? <div className={styles.caption}>{caption}</div> : null}
    </div>
  );
};

PictureWithCaption.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
  caption: undefined,
};

export { PictureWithCaption };
