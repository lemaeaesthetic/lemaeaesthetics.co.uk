import React from "react";
import styles from "./Section.module.scss";

interface SectionProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
  className,
  testId,
  id,
  style,
  children,
}) => {
  const classes = className ? `${className} ${styles.wrapper}` : styles.wrapper;
  return (
    <section style={style} className={classes} id={id} data-testid={testId}>
      {children}
    </section>
  );
};

Section.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
};

export { Section };
