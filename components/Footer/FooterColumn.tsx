import React from "react";
import styles from "./FooterColumn.module.scss"; // Add scss module

interface FooterColumnProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
  children: React.ReactNode;
}

const FooterColumn: React.FC<FooterColumnProps> = ({
  testId,
  className,
  id,
  children,
  style,
}) => {
  // Change styles.FooterColumn
  const classes = `${className ? `${className} ` : ""}${styles.wrapper}`;
  // Alter render method
  return (
    <div data-testid={testId} style={style} className={classes} id={id}>
      {children}
    </div>
  );
};

FooterColumn.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
};

export { FooterColumn };
