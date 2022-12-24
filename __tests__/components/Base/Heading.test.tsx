import { render, screen } from "utils/testing.util";
import { Heading, HeadingLevels } from "components/Base/Heading";

const ID = "heading";
const CLASS = "heading";
const STYLE = { background: "red" };
const TEST_ID = "heading-test";
const CONTENT = "The heading";

describe("<Heading />", () => {
  it("will render the correct attributes", () => {
    const { baseElement } = render(
      <Heading
        id={ID}
        testId={TEST_ID}
        style={STYLE}
        className={CLASS}
        level={1}
        content={CONTENT}
      />
    );
    const byTestId = screen.getByTestId(TEST_ID);
    const byId = baseElement.querySelector<HTMLElement>(`#${ID}`);
    const byClass = baseElement.querySelector<HTMLElement>(`.${CLASS}`);
    [byTestId, byClass, byId].forEach((element) =>
      expect(element).toBeInTheDocument()
    );
    expect(byTestId.style.getPropertyValue("background")).toBe(
      STYLE.background
    );
  });

  it("will render the correct tag according to level", () => {
    HeadingLevels.forEach((level) => {
      render(
        <Heading
          id={ID}
          testId={`${TEST_ID}-${level}`}
          style={STYLE}
          className={CLASS}
          level={level}
          content={CONTENT}
        />
      );
      expect(screen.getByTestId(`${TEST_ID}-${level}`).tagName).toBe(
        `H${level}`
      );
    });
  });
});
