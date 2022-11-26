import React from "react";

interface LinkProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  href: string;
  title: string;
  label: string;
}

const Link: React.FC<LinkProps> = ({
  href,
  title,
  label,
  className,
  id,
  style,
}) => {
  return (
    <a style={style} className={className} id={id} href={href} title={title}>
      {label}
    </a>
  );
};

Link.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
};

export { Link };
