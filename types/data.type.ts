export interface SiteInfo {
  favicon: string;
  siteName: string;
  url: string;
}

export interface CompanyInfo {
  businessName: string;
  tagLine: string;
  address: string[];
  phone: string;
  logoPath: string;
  owner: string;
}

export interface PageData {
  title: string;
  description: string;
}
