import React from "react";
import Link from "next/link";
import styles from "components/Base/Anchor.module.scss";

export interface AnchorProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  href: string;
  title: string;
  label: string;
  rel?: string;
  target?: string;
  testId?: string;
  underline?: boolean;
}

const Anchor: React.FC<AnchorProps> = ({
  href,
  title,
  label,
  className,
  rel,
  testId,
  target,
  id,
  style,
  underline,
}) => {
  return (
    <Link
      href={href}
      style={style}
      className={`${className ? `${className} ` : ""}${styles.anchor}${
        underline ? ` ${styles.underline}` : ""
      }`}
      id={id}
      title={title}
      target={target}
      data-testid={testId}
      rel={rel}
    >
      {label}
    </Link>
  );
};

Anchor.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  rel: undefined,
  target: undefined,
  testId: undefined,
  underline: true,
};

export { Anchor };
