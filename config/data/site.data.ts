type SiteInfo = {
  name: string;
  description: string;
  favicon: string;
  socialImage: string;
  url: string;
};

export const siteInfo: SiteInfo = {
  name: "Website",
  description: "This is a website",
  favicon: "/favicon.ico",
  socialImage: "/next-js-starter-template-cover.jpeg",
  url: process.env.NEXT_PUBLIC_BASE_URL || "https://github.com/makingstuffs",
};
