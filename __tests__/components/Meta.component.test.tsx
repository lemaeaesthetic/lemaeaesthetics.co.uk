import { getAllMeta, render, screen } from "utils";
import { Meta } from "components/Meta/Meta";

const TITLE = "Website";
const DESCRIPTION = "This is my website";
const URL = "http://example.com";
const SITE_NAME = "Website";
const ROBOTS = "index, follow";
const FAVICON = "/favicon.ico";
const META_TAGS = [
  ["property", "og:title", TITLE],
  ["property", "og:description", DESCRIPTION],
  ["property", "og:site_name", SITE_NAME],
  ["property", "og:type", "website"],
  ["property", "og:url", URL],
  ["name", "twitter:title", TITLE],
  ["name", "twitter:description", DESCRIPTION],
  ["name", "description", DESCRIPTION],
  ["name", "robots", ROBOTS],
  ["title", TITLE],
  ["rel", "icon", FAVICON],
];

jest.mock("next/head", () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

const setupTest = () => {
  const utils = render(
    <Meta
      title={TITLE}
      url={URL}
      description={DESCRIPTION}
      siteName={SITE_NAME}
    />
  );
  return { utils };
};

describe("<Meta />", () => {
  it("renders with tags", () => {
    const {
      utils: { baseElement },
    } = setupTest();
    const tags = getAllMeta(baseElement);
    for (let key in tags) {
      expect(tags[key]).toBeInTheDocument();
    }
  });

  it("will render all the elements with correct values", () => {
    const {
      utils: { baseElement },
    } = setupTest();
    META_TAGS.forEach((tag) => {
      // title element
      if (tag.length === 2) {
        expect(baseElement.querySelector("title")?.textContent).toBe(tag[1]);
      } else {
        expect(
          baseElement
            .querySelector(`[${tag[0]}="${tag[1]}"]`)
            ?.getAttribute(tag[1] === "icon" ? "href" : "content")
        ).toBe(tag[2]);
      }
    });
  });
});
