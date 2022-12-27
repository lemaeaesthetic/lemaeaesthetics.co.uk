import React from "react";
import styles from "components/Sections/Enquire/EnquireSection.module.scss"; // Add scss module
import { Section } from "components/Base/Section";
import { HeadingAndCopy } from "components/Base/HeadingAndCopy";
import { BookingForm } from "components/BookingForm/BookingForm";

interface EnquireSectionProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
}

const EnquireSection: React.FC<EnquireSectionProps> = ({
  testId,
  className,
  id,
  style,
}) => {
  // Change styles.component
  const classes = `${className ? `className ` : ""}${styles.wrapper}`;
  // Alter render method

  return (
    <Section data-testid={testId} style={style} className={classes} id={id}>
      <HeadingAndCopy
        heading="Book a Consultation"
        copy={[
          "Add some content to say how long it will take to reply to the queries you receive.",
          "You can also use this section to add information about the process just keep the information relevant.",
        ]}
      />
      <BookingForm />
    </Section>
  );
};

EnquireSection.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
};

export { EnquireSection };
