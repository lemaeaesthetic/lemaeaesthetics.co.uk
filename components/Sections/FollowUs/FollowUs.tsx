import { Heading } from "components/Base/Heading";
import { Section } from "components/Base/Section";
import { SocialIcons } from "components/SocialIcons/SocialIcons";
import React from "react";
import styles from "./FollowUs.module.scss"; // Add scss module

interface FollowUsProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
}

const FollowUs: React.FC<FollowUsProps> = ({
  testId,
  className,
  id,
  style,
}) => {
  // Change styles.FollowUs
  const classes = `${className ? `${className} ` : ""}${styles.wrapper}`;
  return (
    <Section data-testid={testId} style={style} className={classes} id={id}>
      <Heading level={2} content="Follow Us" />
      <SocialIcons />
    </Section>
  );
};

FollowUs.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
};

export { FollowUs };
