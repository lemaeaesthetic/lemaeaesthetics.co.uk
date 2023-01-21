import React from "react";
import styles from "components/Sections/Enquire/EnquireSection.module.scss"; // Add scss module
import { Section } from "components/Base/Section";
import { HeadingAndCopy } from "components/Base/HeadingAndCopy";
import { BookingForm } from "components/BookingForm/BookingForm";
import { GenericPageSection } from "types/cms";

interface EnquireSectionProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
  data: GenericPageSection;
  heading?: string;
}

const EnquireSection: React.FC<EnquireSectionProps> = ({
  testId,
  className,
  id,
  style,
  data,
  heading,
}) => {
  // Change styles.component
  const classes = `${className ? `className ` : ""}${styles.wrapper}`;
  // Alter render method

  return (
    <Section data-testid={testId} style={style} className={classes} id={id}>
      <HeadingAndCopy
        heading={heading || data.heading || "Book a Consultation"}
        copy={data.description || ""}
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
  heading: undefined,
};

export { EnquireSection };
