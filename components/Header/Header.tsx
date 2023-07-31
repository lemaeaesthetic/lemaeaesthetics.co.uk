import React from "react";
import {
  GenericHeaderSection,
  HeroHeaderSection,
  PdpHeaderSection,
} from "types/cms";
import { BasicHeader } from "./BasicHeader";
import { HeroHeader } from "./HeroHeader";
import { PdpHeader } from "./PdpHeader";

export const HeaderTypes = ["hero", "normal", "pdp"] as const;
export type HeaderType = typeof HeaderTypes[number];

interface HeaderProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  type: HeaderType;
  data: HeroHeaderSection | GenericHeaderSection | PdpHeaderSection;
}

const Header: React.FC<HeaderProps> = ({
  className,
  id,
  style,
  type,
  data,
}) => {
  if (type === "normal") {
    return (
      <BasicHeader
        className={className}
        id={id}
        style={style}
        heading={data.heading}
        copy={(data as GenericHeaderSection)?.description}
      />
    );
  }
  if (type === "hero") {
    return (
      <HeroHeader
        className={className}
        id={id}
        style={style}
        title={data.heading}
        imageSrc={(data as HeroHeaderSection).image.url}
        copy={(data as HeroHeaderSection).copy}
      />
    );
  }
  if (type === "pdp") {
    const typedData = data as PdpHeaderSection;
    return (
      <PdpHeader
        className={className}
        id={id}
        style={style}
        heading={data.heading}
        image={typedData.image}
        time={typedData.time}
        price={typedData.price}
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
