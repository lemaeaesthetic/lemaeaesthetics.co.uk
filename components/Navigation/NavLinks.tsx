import { List } from "components/Base/List";
import { navLinks } from "config/data/navigation.data";
import React, { forwardRef, MouseEventHandler } from "react";
import styles from "components/Navigation/NavLinks.module.scss";
import { Button } from "components/Base/Button";
import { IoMdClose } from "react-icons/io";
import { NavLink } from "components/Navigation/NavLink";

interface NavLinksProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  closeCallback: MouseEventHandler<HTMLButtonElement>;
}

const NavLinks = forwardRef<HTMLDivElement, NavLinksProps>((props, ref) => {
  const { style, className, id } = props;
  return (
    <div
      ref={ref}
      style={style}
      className={`${styles.wrapper} ${className}`}
      id={id}
      aria-hidden="true"
    >
      <button
        type="button"
        className={styles.underlay}
        onClick={props.closeCallback}
      />
      <div className={styles["drawer-wrapper"]}>
        <div className={styles["mobile-header"]}>
          <Button
            type="button"
            onClick={props.closeCallback}
            className={styles["close-button"]}
          >
            <IoMdClose size={20} />
          </Button>
        </div>
        <List className={styles["nav-links"]}>
          {navLinks.map((link) => (
            <NavLink
              href={link.href}
              label={link.label}
              title={link.title}
              className={styles["nav-link"]}
              key={Math.random().toString(36).substring(2, 9)}
            />
          ))}
        </List>
      </div>
    </div>
  );
});

NavLinks.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
};

export { NavLinks };
