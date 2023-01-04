import { AnchorProps, Anchor } from "components/Base/Anchor";
import { ListItem } from "components/Base/ListItem";
import React from "react";
import styles from "components/Navigation/NavLink.module.scss";

interface NavLinkProps extends AnchorProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  closeCallback: any;
}

const NavLink: React.FC<NavLinkProps> = ({
  className,
  id,
  style,
  href,
  closeCallback,
  title,
  label,
}) => {
  return (
    <ListItem
      style={style}
      className={`${styles.wrapper} ${className}`}
      id={id}
    >
      <Anchor
        onClick={() => {
          closeCallback();
        }}
        href={`/${href}`}
        title={title}
        label={label}
        className={styles.link}
      />
    </ListItem>
  );
};

NavLink.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
};

export { NavLink };
