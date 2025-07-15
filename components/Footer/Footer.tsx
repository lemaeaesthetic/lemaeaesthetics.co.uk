import { Anchor } from "components/Base/Anchor";
import { Container } from "components/Base/Container";
import { Picture } from "components/Base/Picture";
import { SocialIcons } from "components/SocialIcons/SocialIcons";
import React from "react";
import { Info } from "types/cms";
import Link from "next/link";
import styles from "./Footer.module.scss"; // Add scss module
import { FooterColumn } from "./FooterColumn";

interface FooterProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
  info: Info;
}

const Footer: React.FC<FooterProps> = ({
  testId,
  className,
  id,
  style,
  info,
}) => {
  // Change styles.Footer
  const classes = `${className ? `${className} ` : ""}${styles.wrapper}`;
  // Alter render method
  return (
    <footer data-testid={testId} style={style} className={classes} id={id}>
      <Container>
        <div className={styles.logo}>
          <Picture
            src="/assets/images/lemaeaesthetic-logo.png"
            alt="Wording for Le Mae Aesthetic logo"
            height={50}
          />
          <SocialIcons />
        </div>
        <div className={styles["footer-columns"]}>
          <FooterColumn>
            <h3>Useful Links</h3>
            <ul>
              <li>
                <Anchor href="/about" label="About" title="About" />
              </li>
              <li>
                <Anchor
                  href="https://app.revu.cloud/f-150209"
                  rel="noopener noreferrer"
                  target="_blank"
                  label="Feedback"
                  title="Feedback"
                />
              </li>
              <li>
                <Anchor href="/contact" label="Contact" title="Contact" />
              </li>
              <li>
                <Anchor
                  href="/treatments"
                  label="Treatments"
                  title="Treatments"
                />
              </li>
            </ul>
          </FooterColumn>
          <FooterColumn>
            <h3>Legal Information</h3>
            <ul>
              <li>
                <Anchor
                  href="/privacy"
                  label="Privacy Policy"
                  title="Privacy Policy"
                />
              </li>
              <li>
                <Anchor
                  href="/terms"
                  label="Terms of Use"
                  title="Terms of Use"
                />
              </li>
            </ul>
          </FooterColumn>
          <FooterColumn>
            <h3>Contact Us</h3>
            <address>
              <Link href={`tel:${info?.phoneNumber}`} title="Call me">
                {info?.phoneNumber}
              </Link>
              <ul>
                {info?.address.split("\n").map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </address>
          </FooterColumn>
          {info?.openHours?.length ? (
            <FooterColumn>
              <h3>Open Hours</h3>
              <ul>
                {info?.openHours.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </FooterColumn>
          ) : null}
        </div>
      </Container>
    </footer>
  );
};

Footer.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
};

export { Footer };
