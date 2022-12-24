import React from "react";

interface SectionProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
  className,
  testId,
  id,
  style,
  children,
}) => {
  return (
    <section style={style} className={className} id={id} data-testid={testId}>
      {children}
    </section>
  );
};

Section.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
};

export { Section };
