import React from "react";
import styles from "components/Base/Container.module.scss"; // Add scss module

interface ContainerProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  testId,
  className,
  id,
  style,
  children,
}) => {
  const classes = `${className ? `${className} ` : ""}${styles.container}`;
  // Alter render method
  return (
    <div data-testid={testId} style={style} className={classes} id={id}>
      {children}
    </div>
  );
};

Container.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
};

export { Container };
