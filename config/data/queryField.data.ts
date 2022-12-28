import {
  SECTION_COLLECTION,
  SOCIAL_NETWORKS_COLLECTION,
} from "./collection.data";

export const ALL_SERVICE_FIELDS = `items {
    slug
    name
    content {
        json
    }
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

export const ALL_SECTION_FIELDS = `items {
    id
    heading
    description
    linkUrl
    linkLabel
}`;

export const ALL_PAGE_FIELDS = `items {
    title
    slug
    label
    content {
        json
    }
    ${SECTION_COLLECTION} {
        ${ALL_SECTION_FIELDS}
    }
}`;
