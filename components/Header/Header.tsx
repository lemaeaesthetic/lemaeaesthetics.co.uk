import React from "react";
import { HeroHeaderSection } from "types/cms";
import { BasicHeader } from "./BasicHeader";
import { HeroHeader } from "./HeroHeader";

export const HeaderTypes = ["hero", "normal"] as const;
export type HeaderType = typeof HeaderTypes[number];

interface HeaderProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  type: HeaderType;
  data: HeroHeaderSection;
}

const Header: React.FC<HeaderProps> = ({
  className,
  id,
  style,
  type,
  data,
}) => {
  if (type === "normal") {
    return <BasicHeader className={className} id={id} style={style} />;
  }
  if (type === "hero") {
    return (
      <HeroHeader
        className={className}
        id={id}
        style={style}
        title={data.heading}
        imageSrc={data.image.url}
      />
    );
  }
  return null;
};

Header.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
};

export { Header };
