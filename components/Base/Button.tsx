import React from "react";
import styles from "components/Base/Button.module.scss";

interface ButtonBaseProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  type: "button" | "submit" | "reset";
}

interface ButtonWithLabel {
  label: string;
}

interface ButtonWithChildren {
  children: React.ReactNode;
}

type ButtonProps = ButtonWithLabel | ButtonWithChildren;

const Button: React.FC<ButtonProps & ButtonBaseProps> = (props) => {
  const { className, id, style, onClick, type } = props;
  return (
    <button
      type={type || "button"}
      style={style}
      className={`${styles.button} ${className}`}
      id={id}
      onClick={onClick}
    >
      {"label" in props
        ? (props as ButtonWithLabel).label
        : (props as ButtonWithChildren).children}
    </button>
  );
};

Button.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
};

export { Button };
