"use client";

import React from "react";
import dynamic from "next/dynamic";

interface ReviewProps {
  className?: string;
}

const Content = dynamic(
  async () => (await import("./ReviewContent")).ReviewContent,
  {
    ssr: false,
  }
);

const Review: React.FC<ReviewProps> = ({ className }) => {
  // Alter render method
  return <Content className={className} />;
};

Review.defaultProps = {
  className: undefined,
};

export { Review };
