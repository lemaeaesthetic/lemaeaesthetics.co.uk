import { FaBars } from "react-icons/fa";
import { Button } from "components/Base/Button";
import React from "react";
import styles from "components/Navigation/MobileNavButton.module.scss";

interface MobileNavButtonProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  onClick: any;
}

const MobileNavButton: React.FC<MobileNavButtonProps> = ({
  className,
  id,
  style,
  onClick,
}) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      style={style}
      className={`${styles.button} ${className}`}
      id={id}
    >
      <FaBars size={20} />
    </Button>
  );
};

MobileNavButton.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
};

export { MobileNavButton };
