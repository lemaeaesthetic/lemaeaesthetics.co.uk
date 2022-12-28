import React from "react";

interface BasicHeaderProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  heading: string;
}

const BasicHeader: React.FC<BasicHeaderProps> = ({
  className,
  id,
  style,
  heading,
}) => {
  return (
    <div style={style} className={className} id={id}>
      {heading}
    </div>
  );
};

BasicHeader.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
};

export { BasicHeader };
