import { Anchor } from "components/Base/Anchor";
import { Picture } from "components/Base/Picture";
import React from "react";
import styles from "./HeroHeader.module.scss";

interface HeroHeaderProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  title?: string;
  imageSrc?: string;
  linkLabel?: string;
  linkUrl?: string;
}

const HeroHeader: React.FC<HeroHeaderProps> = ({
  title,
  className,
  id,
  style,
  imageSrc,
  linkLabel,
  linkUrl,
}) => {
  return (
    <header
      data-header="hero"
      style={style}
      className={`${styles["hero-header"]} ${className}`}
      id={id}
    >
      <div className={styles["inner-wrap"]}>
        <div>
          <h1>{title}</h1>
          <Anchor
            className={styles.cta}
            label={linkLabel || "See our Treatments"}
            href={linkUrl || "/treatments"}
            title={linkLabel || "View our treatments"}
          />
        </div>
        <Picture
          src={imageSrc || ""}
          alt="Female model looking to the left"
          minWidth="200px"
          minHeight="300px"
        />
      </div>
    </header>
  );
};

HeroHeader.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  linkLabel: undefined,
  linkUrl: undefined,
  title: "These are words about your business",
  imageSrc: "/assets/images/model-standing.png",
};

export { HeroHeader };
