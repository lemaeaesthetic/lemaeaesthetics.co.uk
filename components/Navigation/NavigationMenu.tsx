import React from "react";

interface NavigationMenuProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  className,
  id,
  style,
}) => {
  return <div style={style} className={className} id={id} />;
};

NavigationMenu.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
};

export { NavigationMenu };
