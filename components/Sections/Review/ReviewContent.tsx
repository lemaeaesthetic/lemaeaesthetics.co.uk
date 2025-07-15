import * as React from "react";
import { useEffect } from "react";
import styles from "./Review.module.scss";

export const ReviewContent: React.FC<{ className?: string }> = ({
  className,
}: {
  className?: string;
}) => {
  const classes = `${className ? `${className} ` : ""}${styles.wrapper}`;
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const script = document.createElement("script");
    script.src = "https://widget.reviewability.com/js/widgetAdv.min.js";
    script.async = true;
    ref.current.appendChild(script);
  }, []);

  return (
    <div className={classes}>
      <div
        className={styles.content}
        data-bid="150209"
        data-url="https://app.revu.cloud"
        ref={ref}
      />
      <script className="json-ld-content" type="application/ld+json" />
    </div>
  );
};

ReviewContent.defaultProps = {
  className: undefined,
};
