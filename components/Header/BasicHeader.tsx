import React from "react";

interface BasicHeaderProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

const BasicHeader: React.FC<BasicHeaderProps> = ({ className, id, style }) => {
  return <div style={style} className={className} id={id} />;
};

BasicHeader.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
};

export { BasicHeader };
