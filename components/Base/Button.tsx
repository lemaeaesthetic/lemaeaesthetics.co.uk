import React from "react";

interface ButtonProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
  type: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  className,
  id,
  style,
  onClick,
  label,
  type,
}) => {
  return (
    <button
      type={type || "button"}
      style={style}
      className={className}
      id={id}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

Button.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
};

export { Button };
