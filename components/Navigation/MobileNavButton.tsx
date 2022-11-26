import React from "react";

interface MobileNavButtonProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

const MobileNaveButton: React.FC<MobileNavButtonProps> = ({
  className,
  id,
  style,
}) => {
  return <div style={style} className={className} id={id} />;
};

MobileNaveButton.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
};

export { MobileNaveButton };
