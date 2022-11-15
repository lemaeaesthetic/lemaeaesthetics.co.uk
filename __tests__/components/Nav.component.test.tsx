import { Nav, NavLinkInterface } from "components/Nav/Nav.component";
import { act } from "react-dom/test-utils";
import { render, screen } from "utils";

const CHILD_IDS = ["child1", "child2"];
const TEST_ID = "Nav";
const SINGLE_TIER_NAV_LINKS: NavLinkInterface[] = [
  {
    label: "link 1",
    url: "/about",
    title: "this is a link",
    isExternal: false,
  },
  {
    label: "link 2",
    url: "/contact",
    title: "this is a link",
    isExternal: false,
  },
];
const TWO_TIER_NAV_LINKS: NavLinkInterface[] = [
  {
    label: "link 1",
    url: "/about",
    title: "this is a link",
    isExternal: false,
    subLinks: [
      {
        label: "sub link 1",
        url: "/about",
        title: "this is a link",
        isExternal: false,
      },
      {
        label: "sub link 2",
        url: "/about",
        title: "this is a link",
        isExternal: false,
      },
    ],
  },
];
const NAV_COMPONENT_NO_SUB_LINKS = (
  <Nav data-testid={TEST_ID} links={SINGLE_TIER_NAV_LINKS}></Nav>
);
const NAV_COMPONENT_SUB_LINKS = (
  <Nav data-testid={TEST_ID} links={TWO_TIER_NAV_LINKS}></Nav>
);

const setupTest = (isTwoTier: boolean = false) => {
  const utils = render(
    isTwoTier ? NAV_COMPONENT_SUB_LINKS : NAV_COMPONENT_NO_SUB_LINKS
  );
  const element = utils.getByTestId(TEST_ID);
  return { element, utils };
};

describe("<Nav />", () => {
  it("will render in the dom", () => {
    const { element } = setupTest();
    expect(element).toBeInTheDocument();
  });

  it("will render tier 1 links", () => {
    const { utils } = setupTest();
    SINGLE_TIER_NAV_LINKS.forEach((link) => {
      expect(utils.getByText(link.label)).toBeInTheDocument();
    });
  });

  it("will render tier two links", () => {
    const { utils } = setupTest(true);
    TWO_TIER_NAV_LINKS[0].subLinks?.forEach((link) => {
      expect(utils.getByText(link.label)).toBeInTheDocument();
    });
  });

  it("will have a child with the class nav-buttons", () => {
    const { utils, element } = setupTest(false);
    expect(element.querySelector(":scope .nav-buttons")).toBeInTheDocument();
  });

  it("will have a child with the class nav-links", () => {
    const { utils, element } = setupTest(false);
    expect(element.querySelector(":scope .nav-links")).toBeInTheDocument();
  });

  it("will set the nav-links aria-expanded to true on screens bigger than 600px", () => {
    global.window.innerWidth = 601;
    const { element } = setupTest(false);
    const links = element.querySelector(":scope .nav-links");
    expect(links?.getAttribute("aria-expanded")).toBe("true");
  });

  it("will toggle the aria-expanded attr of the nav-links element when the button is clicked", () => {
    global.window.innerWidth = 600;
    const { element } = setupTest(false);
    const links = element.querySelector(":scope .nav-links");
    const button = element.querySelector(":scope button") as HTMLButtonElement;

    expect(links?.getAttribute("aria-expanded")).toBe("false");
    act(() => {
      button.click();
    });
    expect(links?.getAttribute("aria-expanded")).toBe("true");
  });

  it("will set the nav-links element aria-expanded attr to false on screens less than 600px", () => {
    global.window.innerWidth = 600;
    const { element } = setupTest(false);
    const links = element.querySelector(":scope .nav-links");

    expect(links?.getAttribute("aria-expanded")).toBe("false");
  });
});
