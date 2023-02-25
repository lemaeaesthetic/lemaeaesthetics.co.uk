import React from "react";
import { useAppSelector } from "services/redux/hooks";
import { selectInfo } from "services/redux/siteInfoSlice";

interface SchemaProps {}

const Schema: React.FC<SchemaProps> = () => {
  const siteInfo = useAppSelector(selectInfo());
  const generateSchemaContent = () => ({
    __html: `{
        "@context": "https://schema.org",
        "@type": "HealthAndBeautyBusiness",
        "name": "${siteInfo.name}",
        "url": "${siteInfo.url}",
        "telephone": "${siteInfo.phoneNumber}",
        "email": "${siteInfo.email}",
    }`,
  });
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={generateSchemaContent()}
    />
  );
};

Schema.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
};

export { Schema };
