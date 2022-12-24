import React from "react";
import styles from "components/Base/List.module.scss";

interface ListProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  children: React.ReactNode;
  listType?: "ol" | "ul";
  testId?: string;
}

const List: React.FC<ListProps> = ({
  className,
  id,
  style,
  children,
  listType = "ul",
  testId,
}) => {
  const ListTag: keyof JSX.IntrinsicElements = `${listType}`;
  return (
    <ListTag
      data-testid={testId}
      style={style}
      className={`${styles.wrapper} ${className}`}
      id={id}
    >
      {children}
    </ListTag>
  );
};

List.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
  listType: "ul",
};

export { List };
