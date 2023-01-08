import { Heading } from "components/Base/Heading";
import { Picture } from "components/Base/Picture";
import React from "react";
import { CmsImage } from "types/cms";
import styles from "./PdpHeader.module.scss";

interface PdpHeaderProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  heading: string;
  image: CmsImage;
  price: number;
  time: number;
}

const PdpHeader: React.FC<PdpHeaderProps> = ({
  className,
  id,
  style,
  heading,
  image,
  time,
  price,
}) => {
  const classes = `${className ? `${className} ` : ""}${styles.wrapper}`;
  return (
    <div style={style} className={classes} id={id}>
      <Heading content={heading} level={1} />
      <Picture src={image?.url} alt={image?.alt} className={styles.thumbnail} />
      <div className={styles.meta}>
        <div className={styles["meta-row"]}>
          From <span>£{price}</span>
        </div>
        <div className={styles["meta-row"]}>
          Takes roughly <span>{time} minutes</span>
        </div>
      </div>
    </div>
  );
};

PdpHeader.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
};

export { PdpHeader };
