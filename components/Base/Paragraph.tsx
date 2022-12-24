import React from "react";
import styles from "components/Base/Paragraph.module.scss";

interface ParagraphProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  children: React.ReactNode;
  testId?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({
  className,
  id,
  style,
  testId,
  children,
}) => {
  const classes = `${className ? `${className} ` : ""}${styles.paragraph}`;
  return (
    <p data-testid={testId} style={style} className={classes} id={id}>
      {children}
    </p>
  );
};

Paragraph.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
};

export { Paragraph };
