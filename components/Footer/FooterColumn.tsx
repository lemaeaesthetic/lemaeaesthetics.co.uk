import React from "react";

interface FooterColumnProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

const FooterColumn: React.FC<FooterColumnProps> = ({
  className,
  id,
  style,
}) => {
  return <div style={style} className={className} id={id} />;
};

FooterColumn.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
};

export { FooterColumn };
