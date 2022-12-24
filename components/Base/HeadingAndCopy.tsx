import React from "react";
import styles from "components/Base/HeadingAndCopy.module.scss";
import { Paragraph } from "components/Base/Paragraph";
import { Heading } from "components/Base/Heading";
import { Container } from "components/Base/Container";
import { Anchor } from "components/Base/Anchor";

interface HeadingAndCopyProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
  copy: string | string[];
  heading: string;
  link?: {
    href: string;
    title: string;
    label: string;
  };
}

const HeadingAndCopy: React.FC<HeadingAndCopyProps> = ({
  testId,
  className,
  id,
  style,
  copy,
  link,
  heading,
}) => {
  let CopyElement;
  if (typeof copy === "string") {
    CopyElement = <Paragraph>{copy}</Paragraph>;
  } else {
    CopyElement = copy.map((line) => (
      <Paragraph key={Math.random().toString(36).substring(2, 9)}>
        {line}
      </Paragraph>
    ));
  }
  return (
    <Container
      data-testid={testId}
      style={style}
      className={`${className ? `${className} ` : ""}${styles.wrapper}`}
      id={id}
    >
      <Heading level={2} content={heading} underline />
      {CopyElement}
      {link ? (
        <Anchor label={link.label} href={link.href} title={link.title} />
      ) : null}
    </Container>
  );
};

HeadingAndCopy.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
  link: undefined,
};

export { HeadingAndCopy };
