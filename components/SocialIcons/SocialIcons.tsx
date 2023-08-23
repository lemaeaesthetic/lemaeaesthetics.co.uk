import { Anchor } from "components/Base/Anchor";
import { Container } from "components/Base/Container";
import React from "react";
import {
  FaFacebook,
  FaGoogle,
  FaInstagram,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";
import { useAppSelector } from "services/redux/hooks";
import { selectInfo } from "services/redux/siteInfoSlice";
import styles from "./SocialIcons.module.scss"; // Add scss module

interface SocialIconsProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
}

const SocialIcons: React.FC<SocialIconsProps> = ({
  testId,
  className,
  id,
  style,
}) => {
  const siteInfo = useAppSelector(selectInfo());
  // Change styles.SocialIcons
  const classes = `${className ? `${className} ` : ""}${styles.wrapper}`;
  // Alter render method
  return (
    <Container data-testid={testId} id={id} style={style} className={classes}>
      {siteInfo?.socialNetworks?.map((network) => {
        if (network?.network?.toUpperCase() === "TWITTER") {
          return (
            <Anchor
              key={Math.random().toString(36).substring(2, 9)}
              href={network.profileUrl}
              title={`Follow us on ${network.network}`}
              label={network.label}
            >
              <FaTwitter size={30} />
            </Anchor>
          );
        }
        if (network?.network?.toUpperCase() === "FACEBOOK") {
          return (
            <Anchor
              key={Math.random().toString(36).substring(2, 9)}
              href={network.profileUrl}
              title={`Follow us on ${network.network}`}
              label={network.label}
            >
              <FaFacebook size={30} />
            </Anchor>
          );
        }
        if (network?.network?.toUpperCase() === "INSTAGRAM") {
          return (
            <Anchor
              key={Math.random().toString(36).substring(2, 9)}
              href={network.profileUrl}
              title={`Follow us on ${network.network}`}
              label={network.label}
            >
              <FaInstagram size={30} />
            </Anchor>
          );
        }
        if (network?.network?.toUpperCase() === "TIK TOK") {
          return (
            <Anchor
              key={Math.random().toString(36).substring(2, 9)}
              href={network.profileUrl}
              title={`Follow us on ${network.network}`}
              label={network.label}
            >
              <FaTiktok size={30} />
            </Anchor>
          );
        }
        if (network?.network?.toUpperCase() === "GOOGLE") {
          return (
            <Anchor
              key={Math.random().toString(36).substring(2, 9)}
              href={network.profileUrl}
              title={`Follow us on ${network.network}`}
              label={network.label}
            >
              <FaGoogle size={30} />
            </Anchor>
          );
        }
        return null;
      })}
    </Container>
  );
};

SocialIcons.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
};

export { SocialIcons };
