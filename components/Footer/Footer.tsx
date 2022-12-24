import React from "react";

interface FooterProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

const Footer: React.FC<FooterProps> = ({ className, id, style }) => {
  return <div style={style} className={className} id={id} />;
};

Footer.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
};

export { Footer };
