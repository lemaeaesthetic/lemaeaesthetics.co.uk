import React from "react";

interface MobileNavDrawerProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  className,
  id,
  style,
}) => {
  return <div style={style} className={className} id={id} />;
};

MobileNavDrawer.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
};

export { MobileNavDrawer };
