import React from "react";

interface ParagraphProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  content: string;
}

const Paragraph: React.FC<ParagraphProps> = ({
  className,
  id,
  style,
  content,
}) => {
  return (
    <p style={style} className={className} id={id}>
      {content}
    </p>
  );
};

Paragraph.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
};

export { Paragraph };
