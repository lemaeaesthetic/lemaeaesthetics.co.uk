import { Button } from "components/Base/Button";
import { Picture } from "components/Base/Picture";
import React from "react";
import styles from "./HeroHeader.module.scss";

interface HeroHeaderProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  title?: string;
}

const HeroHeader: React.FC<HeroHeaderProps> = ({
  title,
  className,
  id,
  style,
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
          <Button type="button" label="See our Treatments" onClick={() => {}} />
        </div>
        <Picture
          src="/assets/images/model-standing.png"
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
  title: "These are words about your business",
};

export { HeroHeader };
