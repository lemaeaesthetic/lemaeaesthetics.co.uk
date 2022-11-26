import React from "react";

interface NavigationLinkProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
  className,
  id,
  style,
}) => {
  return <div style={style} className={className} id={id} />;
};

NavigationLink.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
};

export { NavigationLink };
