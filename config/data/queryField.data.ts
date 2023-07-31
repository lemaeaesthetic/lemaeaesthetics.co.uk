import {
  SECTION_COLLECTION,
  SOCIAL_NETWORKS_COLLECTION,
} from "./collection.data";

export const ALL_SERVICE_FIELDS = `items {
    slug
    name
    description
    price
    timeEstimate
    image {
        description
        url
    }
    content {
        json
    }
    galleryCollection {
        items {
            url
            description
        }
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
    address
    priceRange
    image {
        url
    }
    ${SOCIAL_NETWORKS_COLLECTION} {
        ${SOCIAL_NETWORK_FIELDS}
    }
}`;

export const BASE_SECTION_FIELDS = `
    id
    heading
    description
    linkUrl
    linkLabel
`;

export const ALL_SECTION_FIELDS = `... on Section {
${BASE_SECTION_FIELDS}
}`;

export const ALL_HEADER_SECTION_FIELDS = `... on HeroHeaderSection {
    id
    linkUrl
    linkLabel
    heading
    copy
    image {
        description
        url
    }
}`;

export const ALL_CONTENT_SECTION_FIELDS = `... on ContentSection {
    id
    heading
    content { 
        json
    }
}`;

export const ALL_TEXT_IMAGE_SECTION_FIELDS = `... on TextImageSection {
    ${BASE_SECTION_FIELDS}
    image {
        url
        title
        description
    }
}`;

export const ALL_PAGE_FIELDS = `items {
    title
    slug
    label
    seoTitle
    seoDescription
    seoKeywords
    socialShareImage {
        url
        title
        description
    }
    image {
        url
        title
        description
    }
    ${SECTION_COLLECTION} (limit: 10) {
        items {
            __typename
            ${ALL_HEADER_SECTION_FIELDS}
            ${ALL_SECTION_FIELDS}
            ${ALL_CONTENT_SECTION_FIELDS}
            ${ALL_TEXT_IMAGE_SECTION_FIELDS}
        }
    }
}`;
