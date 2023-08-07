import { Section } from "components/Base/Section";
import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ContentSection } from "types/cms";
import { Container } from "components/Base/Container";
import styles from "./Content.module.scss"; // Add scss module

interface ContentProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
  data: ContentSection;
}

const Content: React.FC<ContentProps> = ({
  testId,
  className,
  id,
  style,
  data,
}) => {
  // Change styles.Content
  const classes = `${className ? `${className} ` : ""}${styles.wrapper}`;
  // Alter render method
  return (
    <Section data-testid={testId} style={style} className={classes} id={id}>
      <Container className={styles.content}>
        {documentToReactComponents(data.content?.json)}
      </Container>
    </Section>
  );
};

Content.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
};

export { Content };
