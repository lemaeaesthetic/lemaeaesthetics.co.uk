import React from "react";
import { BasicHeader } from "./BasicHeader";
import { HeroHeader } from "./HeroHeader";

export const HeaderTypes = ["hero", "normal"] as const;
export type HeaderType = typeof HeaderTypes[number];

interface HeaderProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  type: HeaderType;
}

const Header: React.FC<HeaderProps> = ({ className, id, style, type }) => {
  if (type === "normal") {
    return <BasicHeader className={className} id={id} style={style} />;
  }
  if (type === "hero") {
    return <HeroHeader className={className} id={id} style={style} />;
  }
  return null;
};

Header.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
};

export { Header };
