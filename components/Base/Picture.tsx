import React from "react";

interface PictureProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

const Picture: React.FC<PictureProps> = ({ className, id, style }) => {
  return <picture style={style} className={className} id={id} />;
};

Picture.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
};

export { Picture };
