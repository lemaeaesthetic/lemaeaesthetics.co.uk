import React from "react";
import Image, { ImageProps } from "next/image";
import styles from "components/Base/Picture.module.scss";

interface PictureProps extends ImageProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
  minWidth?: number | string;
  minHeight?: number | string;
}

const Picture: React.FC<PictureProps> = ({
  className,
  id,
  style,
  src,
  alt,
  width,
  testId,
  height,
  minWidth,
  minHeight,
}) => {
  return (
    <picture
      data-testid={testId}
      style={{ width, height, minHeight, minWidth, ...style }}
      className={`${styles.picture}${className ? ` ${className}` : ""}`}
      id={id}
    >
      <Image src={src} alt={alt} fill />
    </picture>
  );
};

Picture.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
  minWidth: undefined,
  minHeight: undefined,
};

export { Picture };
