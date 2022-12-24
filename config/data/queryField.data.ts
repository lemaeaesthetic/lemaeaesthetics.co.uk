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

export const ALL_PAGE_FIELDS = `items {
    title
    slug
    label
    content {
        json
    }
}`;
