import React, { MouseEventHandler, useRef, useState } from "react";
import styles from "components/Navigation/NavMenu.module.scss";
import { MobileNavButton } from "components/Navigation/MobileNavButton";
import { NavLinks } from "components/Navigation/NavLinks";

interface NavMenuProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

const NavMenu: React.FC<NavMenuProps> = ({ className, id, style }) => {
  const [isOpen, setIsOpen] = useState(false);
  const drawer = useRef<HTMLDivElement>();
  const clickHandle: MouseEventHandler<HTMLButtonElement> = () => {
    setIsOpen(!isOpen);
    drawer?.current?.setAttribute("aria-hidden", `${!isOpen}`);
  };
  return (
    <nav style={style} className={`${styles.nav} ${className}`} id={id}>
      <NavLinks
        closeCallback={clickHandle}
        ref={drawer as React.Ref<HTMLDivElement>}
      />
      <MobileNavButton onClick={clickHandle} />
    </nav>
  );
};

NavMenu.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
};

export { NavMenu };
