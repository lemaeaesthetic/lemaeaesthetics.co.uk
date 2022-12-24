import React from "react";

interface ListItemProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  children: React.ReactNode;
  testId?: string;
}

const ListItem: React.FC<ListItemProps> = ({
  className,
  id,
  style,
  children,
  testId,
}) => {
  return (
    <li data-testid={testId} style={style} className={className} id={id}>
      {children}
    </li>
  );
};

ListItem.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
};

export { ListItem };
