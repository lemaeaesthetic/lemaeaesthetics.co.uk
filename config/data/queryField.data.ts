import {
  SECTION_COLLECTION,
  SOCIAL_NETWORKS_COLLECTION,
} from "./collection.data";

export const ALL_SERVICE_FIELDS = `items {
    slug
    name
    description
    image {
        url
    }
}`;

export const ALL_NAV_FIELDS = `items {
    type
    showServices
    entryCollection {
        items {
            slug
            label
            title
        }
    }
}`;

export const SOCIAL_NETWORK_FIELDS = `items {
    profileUrl
    label
    network
}`;

export const SITE_INFO_FIELDS = `items {
    name
    url
    phoneNumber
    email
    ${SOCIAL_NETWORKS_COLLECTION} {
        ${SOCIAL_NETWORK_FIELDS}
    }
}`;

export const ALL_SECTION_FIELDS = `... on Section {
    id
    heading
    description
    linkUrl
    linkLabel
}`;

export const ALL_HEADER_SECTION_FIELDS = `... on HeroHeaderSection {
    id
    linkUrl
    linkLabel
    heading
    image {
      url
    }
}`;

export const ALL_PAGE_FIELDS = `items {
    title
    slug
    label
    content {
        json
    }
    ${SECTION_COLLECTION} (limit: 10) {
        items {
            __typename
            ${ALL_HEADER_SECTION_FIELDS}
            ${ALL_SECTION_FIELDS}
        }
    }
}`;
