import Head from "next/head";
import React from "react";
import { useAppSelector } from "services/redux/hooks";
import { selectInfo } from "services/redux/siteInfoSlice";

interface SchemaProps {}

const Schema: React.FC<SchemaProps> = () => {
  const siteInfo = useAppSelector(selectInfo());
  const generateSchemaContent = () => ({
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HealthAndBeautyBusiness",
      name: siteInfo.name,
      url: siteInfo.url,
      telephone: siteInfo.phoneNumber,
      email: siteInfo.email,
      image: siteInfo?.image?.url,
      address: siteInfo.address,
      priceRange: siteInfo.priceRange,
    }),
  });
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateSchemaContent()}
      />
    </Head>
  );
};

Schema.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
};

export { Schema };
