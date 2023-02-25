import Head from "next/head";
import React, { HTMLAttributes } from "react";
import { useAppSelector } from "services/redux/hooks";
import { selectInfo } from "services/redux/siteInfoSlice";

interface MetaProps extends HTMLAttributes<HTMLHeadElement> {
  title: string;
  description: string;
  url: string;
  favicon?: string;
  keywords?: string[];
  type?: string;
  image: string;
}

export const Meta: React.FC<MetaProps> = ({
  url,
  title,
  description,
  favicon,
  keywords,
  type,
  image,
}) => {
  const siteInfo = useAppSelector(selectInfo());
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <title>{title}</title>
      <meta name="twitter:title" content={title} />
      <meta property="og:title" content={title} />
      <meta name="description" content={description} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteInfo.name} />
      <link rel="icon" href={favicon} />
      <link rel="icon" sizes="150x150" href="/apple-icon.png" />
      <link rel="apple-touch-icon" href="/apple-icon.png" />
      {keywords ? <meta name="keywords" content={keywords.join(", ")} /> : null}
    </Head>
  );
};

Meta.defaultProps = {
  favicon: "/favicon.ico",
  type: "website",
  keywords: [],
};
