import React from "react";
import styles from "components/Base/Heading.module.scss";

export const HeadingLevels = [1, 2, 3, 4, 5, 6] as const;
export type HeadingLevel = typeof HeadingLevels[number];

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  content: string;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  testId?: string;
  underline?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  level,
  style,
  content,
  className,
  id,
  testId,
  underline,
}) => {
  const Tag: keyof JSX.IntrinsicElements = `h${level}`;
  const classes = `${styles.heading}${className ? ` ${className} ` : ""}${
    underline ? ` ${styles.underline}` : ""
  }`;

  return (
    <Tag data-testid={testId} className={classes} id={id} style={style}>
      {content}
    </Tag>
  );
};

Heading.defaultProps = {
  className: undefined,
  id: undefined,
  testId: undefined,
  style: undefined,
  underline: true,
};

export { Heading };
