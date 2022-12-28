import { Document } from "@contentful/rich-text-types";

export interface CmsImage {
  url: string;
}

export const SOCIAL_NETWORKS = ["TWITTER", "FACEBOOK", "INSTAGRAM"] as const;
export type SocialNetwork = typeof SOCIAL_NETWORKS[number];

export const sectionIds = [
  "Enquire",
  "Treatments",
  "Hero Header",
  "About",
  "Follow Us",
] as const;
export type SectionId = typeof sectionIds[number];

export interface SocialProfile {
  profileUrl: string;
  label: string;
  network: SocialNetwork;
}

export interface Info {
  name: string;
  url: string;
  phone: string;
  email: string;
  socialNetworks?: SocialProfile[];
}

export interface Treatment {
  name: string;
  description: string;
  image: CmsImage;
  slug: string;
}

export const NAV_LOCATIONS = ["MAIN", "FOOTER"] as const;
export type NavLocation = typeof NAV_LOCATIONS[number];

export interface NavEntry {
  slug: string;
  label: string;
  title: string;
}

export interface Navigation {
  type: NavLocation;
  entries: NavEntry[];
  showServices: boolean;
}

export const isNavigation = (toCheck: any): toCheck is Navigation =>
  Object.hasOwn(toCheck, "entries") &&
  Object.hasOwn(toCheck, "type") &&
  Object.hasOwn(toCheck, "showServices");

export type HeroHeaderSection = {
  id: SectionId;
  heading: string;
  image: CmsImage;
  linkUrl?: string;
  linkLabel?: string;
};

export type GenericHeaderSection = {
  heading: string;
};

export type PageSection = {
  id: SectionId;
  heading: string;
  description: string;
  linkUrl?: string;
  linkLabel?: string;
};

export interface Page {
  title: string;
  slug: string;
  label: string;
  image: CmsImage;
  content?: Document;
  socialShareImage?: CmsImage;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  sections: (PageSection | HeroHeaderSection)[];
}
