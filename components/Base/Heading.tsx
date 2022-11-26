import React from "react";

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  content: string;
  className?: string;
  id?: string;
  style: React.CSSProperties;
}

const Heading: React.FC<HeadingProps> = ({
  level,
  style,
  content,
  className,
  id,
}) => {
  const Tag: keyof JSX.IntrinsicElements = `h${level}`;
  return (
    <Tag className={className} id={id} style={style}>
      {content}
    </Tag>
  );
};

Heading.defaultProps = {
  className: undefined,
  id: undefined,
};

export { Heading };
