import {
  NAVIGATION_COLLECTION,
  PAGE_COLLECTION,
  SERVICE_COLLECTION,
  SITE_INFO_COLLECTION,
  SOCIAL_NETWORKS_COLLECTION,
} from "config/data/collection.data";
import {
  ALL_NAV_FIELDS,
  ALL_PAGE_FIELDS,
  ALL_SERVICE_FIELDS,
  SITE_INFO_FIELDS,
} from "config/data/queryField.data";
import { Navigation } from "types/cms";

export const fetchFromGraphQl = async (query: string) => {
  const req = await fetch(
    `${process.env.API_BASE_URL}/${process.env.SPACE_ID}/environments/master`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CMS_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    }
  );

  const res = await req.json();
  return res?.data;
};

export const fetchMainNav = async (): Promise<
  Navigation | undefined | unknown
> => {
  try {
    const collection = NAVIGATION_COLLECTION;
    const query = `query GetMainNav {
            ${collection} (where: {type_contains_all:"Main"}, limit: 1) {
                ${ALL_NAV_FIELDS}
            }
        }`;
    const response = await fetchFromGraphQl(query);
    const object = response?.[NAVIGATION_COLLECTION]?.items[0];
    if (!object) return undefined;
    return {
      showServices: object.showServices,
      entries: object.entryCollection.items,
      type: object.type[0],
    };
  } catch (e) {
    return e;
  }
};

export const fetchFooterNavEntries = () => {};

export const fetchAllServices = async () => {
  try {
    const collection = SERVICE_COLLECTION;
    const query = `query GetAllServices {
                ${collection} {
                    ${ALL_SERVICE_FIELDS}
                }
            }`;
    const response = await fetchFromGraphQl(query);
    return response?.[collection]?.items;
  } catch (e) {
    return e;
  }
};

export const fetchServiceFromSlug = async (slug: string) => {
  try {
    const collection = SERVICE_COLLECTION;
    const query = `
            query GetPageFromSlug {
                ${collection} (where: {slug:"${slug}"}, limit: 1) {
                    ${ALL_SERVICE_FIELDS}
                }
            }
        `;
    const page = await fetchFromGraphQl(query);
    return page?.[collection]?.items?.[0];
  } catch (e) {
    return e;
  }
};

export const fetchPageFromSlug = async (slug: string) => {
  try {
    const collection = PAGE_COLLECTION;
    const query = `
        query GetPageFromSlug {
            ${collection} (where: {slug:"${slug}"}, limit: 1) {
                ${ALL_PAGE_FIELDS}
            }
        }
    `;
    const page = await fetchFromGraphQl(query);
    return page?.[collection]?.items?.[0];
  } catch (e) {
    return e;
  }
};

export const fetchSiteInfo = async () => {
  try {
    const collection = SITE_INFO_COLLECTION;
    const query = `query GetSiteInfo {
                ${collection} {
                    ${SITE_INFO_FIELDS}
                }
            }`;
    const response = await fetchFromGraphQl(query);
    const obj = response?.[collection]?.items?.[0];
    const socialNetworks = obj?.[SOCIAL_NETWORKS_COLLECTION]?.items || [];
    return {
      name: obj.name,
      url: obj.url,
      phoneNumber: obj.phoneNumber,
      email: obj.email,
      socialNetworks,
    };
  } catch (e) {
    return e;
  }
};
