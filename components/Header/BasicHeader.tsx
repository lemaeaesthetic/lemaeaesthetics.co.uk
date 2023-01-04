import { Heading } from "components/Base/Heading";
import { Paragraph } from "components/Base/Paragraph";
import React from "react";
import styles from "./BasicHeader.module.scss";

interface BasicHeaderProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  heading: string;
  copy?: string;
}

const BasicHeader: React.FC<BasicHeaderProps> = ({
  className,
  id,
  style,
  heading,
  copy,
}) => {
  const classes = `${className ? `${className} ` : ""}${styles.wrapper}`;
  console.log(heading);
  return (
    <div style={style} className={classes} id={id}>
      <Heading content={heading} level={1} />
      {copy ? <Paragraph>{copy}</Paragraph> : null}
    </div>
  );
};

BasicHeader.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  copy: undefined,
};

export { BasicHeader };
