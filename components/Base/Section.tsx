import React from "react";

interface SectionProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

const Section: React.FC<SectionProps> = ({ className, id, style }) => {
  return <section style={style} className={className} id={id} />;
};

Section.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
};

export { Section };
