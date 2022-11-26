import React from "react";

interface HeroHeaderProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

const HeroHeader: React.FC<HeroHeaderProps> = ({ className, id, style }) => {
  return <div style={style} className={className} id={id} />;
};

HeroHeader.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
};

export { HeroHeader };
